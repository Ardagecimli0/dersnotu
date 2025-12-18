// src/modules/auth/jwt.strategy.ts
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Token'ı "Authorization: Bearer <token>" başlığından oku
      ignoreExpiration: false, // Süresi dolmuş tokenları reddet
      secretOrKey: 'GIZLI_KELIME', // GERÇEK HAYATTA BU .ENV DOSYASINDAN GELMELİ! (process.env.JWT_SECRET)
    });
  }

  // Token geçerliyse bu çalışır ve request.user içine veriyi ekler
  validate(payload: any) {
    return { userId: payload.sub, email: payload.email, role: payload.role };
  }
}
