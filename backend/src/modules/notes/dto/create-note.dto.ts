// src/modules/notes/dto/create-note.dto.ts
import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

const CreateNoteSchema = z.object({
  title: z.string().min(3, { message: 'Başlık en az 3 karakter olmalı' }),
  content: z.string().optional(), // Açıklama opsiyonel
  topicId: z.number({ error: 'Konu seçimi zorunludur' }),
  fileUrl: z.string().url().optional(), // Şimdilik elle link gireceğiz
});

export class CreateNoteDto extends createZodDto(CreateNoteSchema) {}