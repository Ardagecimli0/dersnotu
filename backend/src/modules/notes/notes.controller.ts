// src/modules/notes/notes.controller.ts
import { 
  Controller, 
  Post, 
  Body, 
  UseGuards, 
  Req, 
  Get, 
  UsePipes, 
  Patch,              // <-- EKLENDI
  Param,              // <-- EKLENDI
  ForbiddenException  // <-- EKLENDI
} from '@nestjs/common';
import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { AuthGuard } from '@nestjs/passport';
import { ZodValidationPipe } from 'nestjs-zod';

@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  // 🔒 1. NOT YÜKLEME (Sadece giriş yapmış kullanıcılar)
  @Post()
  @UseGuards(AuthGuard('jwt')) 
  @UsePipes(ZodValidationPipe)
  create(@Req() req, @Body() createNoteDto: CreateNoteDto) {
    const userId = req.user.userId;
    return this.notesService.create(userId, createNoteDto);
  }

  // 🔓 2. NOTLARI LİSTELEME (Herkes görebilir)
  @Get()
  findAll() {
    return this.notesService.findAll();
  }

  // 👑 3. NOT ONAYLAMA (Sadece ADMIN yetkisi olanlar)
  @Patch(':id/approve')
  @UseGuards(AuthGuard('jwt'))
  async approve(@Param('id') id: string, @Req() req) {
    // Admin kontrolü
    if (req.user.role !== 'ADMIN') {
      throw new ForbiddenException('Bu işlemi sadece Yöneticiler yapabilir!');
    }

    return this.notesService.approve(id);
  }
}