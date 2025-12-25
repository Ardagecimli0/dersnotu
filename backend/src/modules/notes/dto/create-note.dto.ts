// src/modules/notes/dto/create-note.dto.ts
import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

const CreateNoteSchema = z.object({
  title: z.string().min(3, { message: 'Başlık en az 3 karakter olmalı' }),
  content: z.string().optional(), // Açıklama opsiyonel
  // topicId veya (topicName + lessonId) zorunlu
  topicId: z.number().optional(),
  topicName: z.string().optional(),
  lessonId: z.number().optional(),
  // fileUrl: boş string veya geçerli URL olabilir (opsiyonel)
  fileUrl: z.union([
    z.string().url(),
    z.literal(''),
  ]).optional(),
}).refine(
  (data) => data.topicId || (data.topicName && data.lessonId),
  {
    message: 'Konu bilgisi gerekli: topicId veya (topicName + lessonId)',
    path: ['topicId'],
  }
);

export class CreateNoteDto extends createZodDto(CreateNoteSchema) {}
