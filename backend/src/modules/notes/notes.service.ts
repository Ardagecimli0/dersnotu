// src/modules/notes/notes.service.ts
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { PrismaService } from '../../providers/prisma.service';
import defaultSlugify from 'slugify';
import { XP_REWARDS } from '../xp/xp.service';

@Injectable()
export class NotesService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, createNoteDto: CreateNoteDto & { topicName?: string; lessonId?: number }) {
    // 1. Konu ID'sini bul veya oluştur
    let topicId = createNoteDto.topicId;
    
    // Eğer topicName ve lessonId verilmişse, konuyu bul veya oluştur
    if (!topicId && createNoteDto.topicName && createNoteDto.lessonId) {
      const topicSlug = defaultSlugify(createNoteDto.topicName, {
        lower: true,
        strict: true,
      });
      
      // Konuyu bul veya oluştur
      const topic = await this.prisma.topic.upsert({
        where: {
          lessonId_slug: {
            lessonId: createNoteDto.lessonId,
            slug: topicSlug,
          },
        },
        update: {},
        create: {
          name: createNoteDto.topicName,
          slug: topicSlug,
          lessonId: createNoteDto.lessonId,
        },
      });
      
      topicId = topic.id;
    }

    if (!topicId) {
      throw new BadRequestException('Konu bilgisi bulunamadı');
    }

    // 2. Slug Oluşturma (SEO İçin)
    const rawSlug = defaultSlugify(createNoteDto.title, {
      lower: true,
      strict: true,
    });
    const uniqueSuffix = Date.now().toString().slice(-4);
    const finalSlug = `${rawSlug}-${uniqueSuffix}`;

    // 3. Veritabanına Kayıt
    const newNote = await this.prisma.note.create({
      data: {
        title: createNoteDto.title,
        content: createNoteDto.content || '',
        fileUrl: createNoteDto.fileUrl,
        topicId: topicId,
        uploaderId: userId,
        slug: finalSlug,
      },
    });

    // 4. Kullanıcıya XP ekle (Not yükleme için +30 XP)
    const uploadPoints = XP_REWARDS.NOTE_UPLOAD;
    await this.prisma.user.update({
      where: { id: userId },
      data: {
        currentPoints: { increment: uploadPoints },
        totalPoints: { increment: uploadPoints },
      },
    });

    // 5. İşlem kaydı oluştur
    await this.prisma.pointTransaction.create({
      data: {
        userId,
        amount: uploadPoints,
        type: 'EARN_NOTE_UPLOAD',
        description: `Not yükleme: ${createNoteDto.title}`,
      },
    });

    return {
      message: 'Not başarıyla gönderildi, onay bekleniyor.',
      note: newNote,
    };
  }

  // Tüm notları getir (Şimdilik sadece onaylananları getirmeli)
  async findAll(lesson?: string, grade?: string) {
    const where: any = { status: 'APPROVED' };
    
    // Filtreleme için where koşulları
    if (lesson || grade) {
      where.topic = {
        lesson: {
          ...(lesson && { slug: lesson }),
          ...(grade && {
            grade: {
              slug: grade,
            },
          }),
        },
      };
    }

    return this.prisma.note.findMany({
      where,
      include: {
        uploader: { select: { username: true } },
        topic: {
          select: {
            name: true,
            lesson: {
              select: {
                name: true,
                slug: true,
                grade: {
                  select: {
                    name: true,
                    slug: true,
                  },
                },
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  // Tek bir notu getir
  async findOne(noteId: string) {
    const note = await this.prisma.note.findUnique({
      where: { id: noteId },
      include: {
        uploader: { select: { username: true } },
        topic: {
          select: {
            name: true,
            lesson: {
              select: {
                name: true,
                slug: true,
                grade: {
                  select: {
                    name: true,
                    slug: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!note) {
      throw new BadRequestException('Not bulunamadı');
    }

    // Görüntülenme sayısını artır
    await this.prisma.note.update({
      where: { id: noteId },
      data: { viewCount: { increment: 1 } },
    });

    return {
      ...note,
      viewCount: note.viewCount + 1,
    };
  }

  async approve(noteId: string) {
    // $transaction: Ya hepsi yapılır ya hiçbiri yapılmaz (Atomik İşlem)
    return this.prisma.$transaction(async (tx) => {
      // 1. Notu bul
      const note = await tx.note.findUnique({ where: { id: noteId } });
      if (!note) throw new BadRequestException('Not bulunamadı');
      if (note.status === 'APPROVED')
        throw new BadRequestException('Bu not zaten onaylanmış');

      // 2. Notun durumunu güncelle
      const updatedNote = await tx.note.update({
        where: { id: noteId },
        data: { status: 'APPROVED' },
      });

      // 3. Kullanıcıya Puan Ver (+1000 XP - Not onaylanması)
      const POINTS_REWARD = XP_REWARDS.NOTE_APPROVED;
      await tx.user.update({
        where: { id: note.uploaderId },
        data: {
          currentPoints: { increment: POINTS_REWARD },
          totalPoints: { increment: POINTS_REWARD },
        },
      });

      // 4. Muhasebe Kaydı Oluştur (Log)
      await tx.pointTransaction.create({
        data: {
          userId: note.uploaderId,
          amount: POINTS_REWARD,
          type: 'EARN_NOTE_APPROVED',
          description: `Not Onayı: ${note.title}`,
        },
      });

      return {
        message: 'Not onaylandı, kullanıcıya puan yüklendi.',
        note: updatedNote,
      };
    });
  }

  // Not reddetme
  async reject(noteId: string, reason: string) {
    const note = await this.prisma.note.findUnique({ where: { id: noteId } });
    if (!note) throw new NotFoundException('Not bulunamadı');
    if (note.status === 'REJECTED')
      throw new BadRequestException('Bu not zaten reddedilmiş');

    return this.prisma.note.update({
      where: { id: noteId },
      data: {
        status: 'REJECTED',
        rejectionReason: reason,
      },
    });
  }

  // Admin için tüm notları getir (tüm statüler)
  async findAllForAdmin() {
    return this.prisma.note.findMany({
      include: {
        uploader: { 
          select: { 
            username: true, 
            email: true 
          } 
        },
        topic: {
          select: {
            name: true,
            lesson: {
              select: {
                name: true,
                grade: {
                  select: {
                    name: true,
                  },
                },
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  // Not güncelleme
  async update(noteId: string, updateDto: { title?: string; content?: string; fileUrl?: string; topicId?: number }) {
    const note = await this.prisma.note.findUnique({ where: { id: noteId } });
    if (!note) throw new NotFoundException('Not bulunamadı');

    return this.prisma.note.update({
      where: { id: noteId },
      data: {
        ...(updateDto.title && { title: updateDto.title }),
        ...(updateDto.content !== undefined && { content: updateDto.content }),
        ...(updateDto.fileUrl !== undefined && { fileUrl: updateDto.fileUrl }),
        ...(updateDto.topicId && { topicId: updateDto.topicId }),
      },
    });
  }

  // Not silme
  async delete(noteId: string) {
    const note = await this.prisma.note.findUnique({ where: { id: noteId } });
    if (!note) throw new NotFoundException('Not bulunamadı');

    await this.prisma.note.delete({
      where: { id: noteId },
    });

    return { message: 'Not başarıyla silindi.' };
  }
}
