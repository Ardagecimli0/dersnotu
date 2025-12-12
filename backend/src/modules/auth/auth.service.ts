// src/modules/auth/auth.service.ts
import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../providers/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginDto, RegisterDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  // 1. KAYIT OLMA (REGISTER)
  async register(dto: RegisterDto) {
    // a. Email zaten var mı?
    const existingUser = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });
    if (existingUser) throw new BadRequestException('Bu email zaten kullanımda.');

    // b. Şifreyi Hashle
    const hashedPassword = await bcrypt.hash(dto.password, 10);

    // c. Veritabanına Kaydet
    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        username: dto.username,
        passwordHash: hashedPassword,
      },
    });

    // d. Şifreyi geri döndürme!
    return { message: 'Kayıt başarılı', userId: user.id };
  }

  // 2. GİRİŞ YAPMA (LOGIN)
  async login(dto: LoginDto) {
    // a. Kullanıcıyı bul
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });
    if (!user) throw new UnauthorizedException('Email veya şifre hatalı');

    // b. Şifreyi kontrol et (Hash kıyaslama)
    const isMatch = await bcrypt.compare(dto.password, user.passwordHash);
    if (!isMatch) throw new UnauthorizedException('Email veya şifre hatalı');

    // c. Token üret
    const payload = { sub: user.id, email: user.email, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}