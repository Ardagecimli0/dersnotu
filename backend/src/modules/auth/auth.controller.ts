// src/modules/auth/auth.controller.ts
import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './dto/auth.dto';
import { ZodValidationPipe } from 'nestjs-zod';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @UsePipes(ZodValidationPipe) // DTO'daki Zod kurallarını uygula
  register(@Body() body: RegisterDto) {
    return this.authService.register(body);
  }

  @Post('login')
  @UsePipes(ZodValidationPipe)
  login(@Body() body: LoginDto) {
    return this.authService.login(body);
  }
}
