import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../../providers/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  create(createUserDto: CreateUserDto) {
    return this.prisma.user.create({
      data: createUserDto,
    });
  }

  findAll() {
    return this.prisma.user.findMany({
      select: {
        id: true,
        email: true,
        username: true,
        role: true,
        createdAt: true,
        updatedAt: true,
        passwordHash: false, // Don't include password hash
      },
    });
  }

  findOne(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        username: true,
        role: true,
        createdAt: true,
        updatedAt: true,
        passwordHash: false,
      },
    });
  }

  findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async getProfile(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        username: true,
        role: true,
        profileImage: true,
        bio: true,
        currentPoints: true,
        totalPoints: true,
        createdAt: true,
        updatedAt: true,
        _count: {
          select: {
            notes: true,
          },
        },
      },
    });

    if (!user) {
      throw new NotFoundException('Kullanıcı bulunamadı');
    }

    return user;
  }

  async updateProfile(userId: string, updateUserDto: { profileImage?: string; bio?: string; username?: string }) {
    return this.prisma.user.update({
      where: { id: userId },
      data: updateUserDto,
      select: {
        id: true,
        email: true,
        username: true,
        role: true,
        profileImage: true,
        bio: true,
        currentPoints: true,
        totalPoints: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async addPoints(userId: string, points: number, description?: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new Error('Kullanıcı bulunamadı');
    }

    // Puanları güncelle
    await this.prisma.user.update({
      where: { id: userId },
      data: {
        currentPoints: { increment: points },
        totalPoints: { increment: points },
      },
    });

    // İşlem kaydı oluştur
    await this.prisma.pointTransaction.create({
      data: {
        userId,
        amount: points,
        type: 'EARN_UPLOAD',
        description: description || 'Not yükleme',
      },
    });

    return { message: `${points} puan eklendi` };
  }

  async getUserNotes(userId: string) {
    return this.prisma.note.findMany({
      where: { uploaderId: userId },
      include: {
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

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });
  }

  remove(id: string) {
    return this.prisma.user.delete({
      where: { id },
    });
  }
}
