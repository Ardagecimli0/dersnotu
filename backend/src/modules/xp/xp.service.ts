// src/modules/xp/xp.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../providers/prisma.service';

// XP Sabitleri - DRY prensibi için tek yerden yönetim
export const XP_REWARDS = {
  COMMENT: 20,           // Yorum atma
  NOTE_UPLOAD: 30,       // Not yükleme
  NOTE_APPROVED: 1000,   // Not onaylanması
  SESSION_TIME: 1,       // Her 30 dakikada bir
} as const;

export type XPType = 
  | 'COMMENT' 
  | 'NOTE_UPLOAD' 
  | 'NOTE_APPROVED' 
  | 'SESSION_TIME'
  | 'ADMIN_ADJUST';

@Injectable()
export class XpService {
  constructor(private prisma: PrismaService) {}

  /**
   * Kullanıcıya XP ekler ve transaction kaydı oluşturur
   * @param userId - Kullanıcı ID
   * @param amount - XP miktarı
   * @param type - XP türü
   * @param description - Açıklama
   * @returns Güncellenmiş kullanıcı bilgileri ve eklenen XP
   */
  async addXP(userId: string, amount: number, type: XPType, description?: string) {
    return this.prisma.$transaction(async (tx) => {
      // 1. Kullanıcı puanlarını güncelle
      const updatedUser = await tx.user.update({
        where: { id: userId },
        data: {
          currentPoints: { increment: amount },
          totalPoints: { increment: amount },
        },
        select: {
          id: true,
          username: true,
          currentPoints: true,
          totalPoints: true,
        },
      });

      // 2. Transaction kaydı oluştur
      await tx.pointTransaction.create({
        data: {
          userId,
          amount,
          type: `EARN_${type}`,
          description: description || `${type} için XP kazanıldı`,
        },
      });

      return {
        user: updatedUser,
        xpAdded: amount,
        type,
      };
    });
  }

  /**
   * Yorum için XP ekle
   */
  async addCommentXP(userId: string, noteTitle?: string) {
    return this.addXP(
      userId,
      XP_REWARDS.COMMENT,
      'COMMENT',
      noteTitle ? `Yorum: ${noteTitle}` : 'Yorum yapıldı'
    );
  }

  /**
   * Not yükleme için XP ekle
   */
  async addNoteUploadXP(userId: string, noteTitle: string) {
    return this.addXP(
      userId,
      XP_REWARDS.NOTE_UPLOAD,
      'NOTE_UPLOAD',
      `Not yükleme: ${noteTitle}`
    );
  }

  /**
   * Not onaylanması için XP ekle
   */
  async addNoteApprovedXP(userId: string, noteTitle: string) {
    return this.addXP(
      userId,
      XP_REWARDS.NOTE_APPROVED,
      'NOTE_APPROVED',
      `Not onaylandı: ${noteTitle}`
    );
  }

  /**
   * Session süresi için XP ekle (30 dakikada 1 XP)
   */
  async addSessionXP(userId: string) {
    return this.addXP(
      userId,
      XP_REWARDS.SESSION_TIME,
      'SESSION_TIME',
      'Sitede vakit geçirme bonusu'
    );
  }

  /**
   * Liderlik tablosu - Optimize edilmiş sorgu
   * @param limit - Kaç kullanıcı getirileceği
   * @param period - 'all' | 'monthly' | 'yearly'
   */
  async getLeaderboard(limit: number = 100, period: 'all' | 'monthly' | 'yearly' = 'all') {
    if (period === 'all') {
      // Tüm zamanlar için direkt totalPoints kullan (en hızlı)
      return this.prisma.user.findMany({
        select: {
          id: true,
          username: true,
          profileImage: true,
          totalPoints: true,
          currentPoints: true,
          _count: {
            select: {
              notes: {
                where: { status: 'APPROVED' },
              },
            },
          },
        },
        orderBy: {
          totalPoints: 'desc',
        },
        take: limit,
      });
    }

    // Aylık veya yıllık için transaction tablosundan hesapla
    const now = new Date();
    let startDate: Date;

    if (period === 'monthly') {
      startDate = new Date(now.getFullYear(), now.getMonth(), 1);
    } else {
      startDate = new Date(now.getFullYear(), 0, 1);
    }

    // Aggregate query ile optimize edilmiş hesaplama
    const transactions = await this.prisma.pointTransaction.groupBy({
      by: ['userId'],
      where: {
        createdAt: {
          gte: startDate,
        },
        amount: {
          gt: 0, // Sadece pozitif işlemler
        },
      },
      _sum: {
        amount: true,
      },
      orderBy: {
        _sum: {
          amount: 'desc',
        },
      },
      take: limit,
    });

    // Kullanıcı bilgilerini getir
    const userIds = transactions.map((t) => t.userId);
    const users = await this.prisma.user.findMany({
      where: {
        id: { in: userIds },
      },
      select: {
        id: true,
        username: true,
        profileImage: true,
        totalPoints: true,
        currentPoints: true,
        _count: {
          select: {
            notes: {
              where: { status: 'APPROVED' },
            },
          },
        },
      },
    });

    // Sonuçları birleştir ve sırala
    return transactions.map((t) => {
      const user = users.find((u) => u.id === t.userId);
      return {
        ...user,
        periodPoints: t._sum.amount || 0,
      };
    });
  }

  /**
   * Kullanıcının sıralamasını getir
   */
  async getUserRank(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { totalPoints: true },
    });

    if (!user) return null;

    // Kullanıcıdan daha yüksek puanlı kullanıcı sayısı + 1 = sıralama
    const higherRankedCount = await this.prisma.user.count({
      where: {
        totalPoints: {
          gt: user.totalPoints,
        },
      },
    });

    return {
      rank: higherRankedCount + 1,
      totalPoints: user.totalPoints,
    };
  }

  /**
   * Kullanıcının XP geçmişini getir
   */
  async getUserXPHistory(userId: string, limit: number = 20) {
    return this.prisma.pointTransaction.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: limit,
      select: {
        id: true,
        amount: true,
        type: true,
        description: true,
        createdAt: true,
      },
    });
  }
}
