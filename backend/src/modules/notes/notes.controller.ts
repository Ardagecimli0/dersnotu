// src/modules/notes/notes.controller.ts
import {
  Controller,
  Post,
  Body,
  UseGuards,
  Req,
  Get,
  UsePipes,
  Patch,
  Param,
  Query,
  Delete,
  ForbiddenException,
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
  create(@Req() req: any, @Body() createNoteDto: CreateNoteDto) {
    const userId = req.user.userId;
    return this.notesService.create(userId, createNoteDto);
  }

  // 🔓 2. NOTLARI LİSTELEME (Herkes görebilir)
  @Get()
  findAll(@Query('lesson') lesson?: string, @Query('grade') grade?: string) {
    return this.notesService.findAll(lesson, grade);
  }

  // 🔓 3. NOT DETAYI - SLUG İLE (Herkes görebilir)
  @Get('slug/:slug')
  findBySlug(@Param('slug') slug: string) {
    return this.notesService.findBySlug(slug);
  }

  // 🔓 4. NOT DETAYI - ID İLE (Herkes görebilir)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.notesService.findOne(id);
  }

  // 👑 4. NOT ONAYLAMA (Sadece ADMIN yetkisi olanlar)
  @Patch(':id/approve')
  @UseGuards(AuthGuard('jwt'))
  async approve(@Param('id') id: string, @Req() req: any) {
    // Admin kontrolü
    if (req.user.role !== 'ADMIN') {
      throw new ForbiddenException('Bu işlemi sadece Yöneticiler yapabilir!');
    }

    return this.notesService.approve(id);
  }

  // 👑 5. NOT REDDETME (Sadece ADMIN yetkisi olanlar)
  @Patch(':id/reject')
  @UseGuards(AuthGuard('jwt'))
  async reject(@Param('id') id: string, @Body() body: { reason: string }, @Req() req: any) {
    // Admin kontrolü
    if (req.user.role !== 'ADMIN') {
      throw new ForbiddenException('Bu işlemi sadece Yöneticiler yapabilir!');
    }

    return this.notesService.reject(id, body.reason);
  }

  // 👑 6. TÜM NOTLARI GETİR (ADMIN için - tüm statüler)
  @Get('admin/all')
  @UseGuards(AuthGuard('jwt'))
  async findAllForAdmin(@Req() req: any) {
    // Admin kontrolü
    if (req.user.role !== 'ADMIN') {
      throw new ForbiddenException('Bu işlemi sadece Yöneticiler yapabilir!');
    }

    return this.notesService.findAllForAdmin();
  }

  // 👑 7. NOT SİLME (Sadece ADMIN yetkisi olanlar)
  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  async update(@Param('id') id: string, @Body() updateDto: any, @Req() req: any) {
    // Admin kontrolü
    if (req.user.role !== 'ADMIN') {
      throw new ForbiddenException('Bu işlemi sadece Yöneticiler yapabilir!');
    }

    return this.notesService.update(id, updateDto);
  }

  // 👑 8. NOT SİLME (Sadece ADMIN yetkisi olanlar)
  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  async delete(@Param('id') id: string, @Req() req: any) {
    // Admin kontrolü
    if (req.user.role !== 'ADMIN') {
      throw new ForbiddenException('Bu işlemi sadece Yöneticiler yapabilir!');
    }

    return this.notesService.delete(id);
  }
}
