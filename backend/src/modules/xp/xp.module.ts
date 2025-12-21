// src/modules/xp/xp.module.ts
import { Module } from '@nestjs/common';
import { XpService } from './xp.service';
import { XpController } from './xp.controller';
import { PrismaService } from '../../providers/prisma.service';

@Module({
  controllers: [XpController],
  providers: [XpService, PrismaService],
  exports: [XpService], // Diğer modüller kullanabilsin
})
export class XpModule {}
