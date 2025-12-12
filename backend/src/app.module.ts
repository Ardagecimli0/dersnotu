// src/app.module.ts
import { Module } from '@nestjs/common';
import { PrismaModule } from './providers/prisma.module';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { NotesModule } from './modules/notes/notes.module';

@Module({
  imports: [PrismaModule, UsersModule, AuthModule, NotesModule], // <-- Ekledik
  controllers: [],
  providers: [],
})
export class AppModule {}
