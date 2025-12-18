// src/providers/prisma.module.ts
import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global() // Dikkat: Global yaptık, böylece her modülde tekrar import etmeye gerek kalmayacak.
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
