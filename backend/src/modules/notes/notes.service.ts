// src/modules/notes/notes.service.ts
import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { PrismaService } from '../../providers/prisma.service';
import defaultSlugify from 'slugify';

@Injectable()
export class NotesService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, createNoteDto: CreateNoteDto) {
    // 1. Slug Oluşturma (SEO İçin)
    // Aynı isimde not varsa sonuna rastgele sayı ekleyelim ki çakışmasın.
    const rawSlug = defaultSlugify(createNoteDto.title, { lower: true, strict: true });
    const uniqueSuffix = Date.now().toString().slice(-4); // Son 4 hane
    const finalSlug = `${rawSlug}-${uniqueSuffix}`;

    // 2. Veritabanına Kayıt
    // Status varsayılan olarak "PENDING" olacak (Schema'da öyle ayarladık)
    const newNote = await this.prisma.note.create({
      data: {
        title: createNoteDto.title,
        content: createNoteDto.content || '',
        fileUrl: createNoteDto.fileUrl,
        topicId: createNoteDto.topicId, // Hangi konu (Örn: Kümeler)
        uploaderId: userId,             // Kim yükledi?
        slug: finalSlug,
      },
    });

    return { message: 'Not başarıyla gönderildi, onay bekleniyor.', note: newNote };
  }

  // Tüm notları getir (Şimdilik sadece onaylananları getirmeli)
  async findAll() {
    return this.prisma.note.findMany({
      where: { status: 'APPROVED' }, 
      include: { 
        uploader: { select: { username: true } }, // Yükleyenin adını da getir
        topic: { select: { name: true } }         // Konu adını da getir
      }
    });
  }

  // src/modules/notes/notes.service.ts içine eklenecek:

  // ... create ve findAll metodlarından sonra ...

  async approve(noteId: string) {
    // $transaction: Ya hepsi yapılır ya hiçbiri yapılmaz (Atomik İşlem)
    return this.prisma.$transaction(async (tx) => {
      // 1. Notu bul
      const note = await tx.note.findUnique({ where: { id: noteId } });
      if (!note) throw new BadRequestException('Not bulunamadı');
      if (note.status === 'APPROVED') throw new BadRequestException('Bu not zaten onaylanmış');

      // 2. Notun durumunu güncelle
      const updatedNote = await tx.note.update({
        where: { id: noteId },
        data: { status: 'APPROVED' },
      });

      // 3. Kullanıcıya Puan Ver (+10 Puan)
      const POINTS_REWARD = 10;
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
          type: 'EARN_UPLOAD', // Schema'da tanımladığımız Enum
          description: `Not Onayı: ${note.title}`,
        },
      });

      return { message: 'Not onaylandı, kullanıcıya puan yüklendi.', note: updatedNote };
    });
  }
}