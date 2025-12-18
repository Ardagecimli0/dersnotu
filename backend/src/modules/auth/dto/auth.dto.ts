// src/modules/auth/dto/auth.dto.ts
import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';

// Zod ile Kurallar
const RegisterSchema = z.object({
  email: z.string().email({ message: 'Geçerli bir email giriniz' }),
  password: z.string().min(6, { message: 'Şifre en az 6 karakter olmalı' }),
  username: z
    .string()
    .min(3, { message: 'Kullanıcı adı en az 3 karakter olmalı' }),
});

const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

// NestJS'in anlayacağı DTO sınıflarına çevirme
export class RegisterDto extends createZodDto(RegisterSchema) {}
export class LoginDto extends createZodDto(LoginSchema) {}
