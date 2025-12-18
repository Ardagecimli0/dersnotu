import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../providers/prisma.service';

@Injectable()
export class GradesService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.grade.findMany({
      include: {
        lessons: {
          include: {
            topics: true,
          },
        },
      },
      orderBy: {
        id: 'asc',
      },
    });
  }
}

