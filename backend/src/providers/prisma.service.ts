// src/providers/prisma.service.ts
import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  // Uygulama başladığında veritabanına bağlan
  async onModuleInit() {
    await this.$connect();
  }

  // Uygulama kapandığında bağlantıyı kes
  async onModuleDestroy() {
    await this.$disconnect();
  }
}
