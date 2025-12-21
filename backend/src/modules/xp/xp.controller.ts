// src/modules/xp/xp.controller.ts
import { Controller, Get, Post, Query, UseGuards, Request } from '@nestjs/common';
import { XpService } from './xp.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('xp')
export class XpController {
  constructor(private readonly xpService: XpService) {}

  /**
   * Liderlik tablosu
   * GET /xp/leaderboard?limit=100&period=all
   */
  @Get('leaderboard')
  async getLeaderboard(
    @Query('limit') limit?: string,
    @Query('period') period?: 'all' | 'monthly' | 'yearly',
  ) {
    const parsedLimit = limit ? parseInt(limit, 10) : 100;
    const leaderboard = await this.xpService.getLeaderboard(parsedLimit, period || 'all');
    return leaderboard;
  }

  /**
   * Kullanıcının sıralamasını getir
   * GET /xp/rank
   */
  @Get('rank')
  @UseGuards(JwtAuthGuard)
  async getUserRank(@Request() req: any) {
    return this.xpService.getUserRank(req.user.sub);
  }

  /**
   * Kullanıcının XP geçmişi
   * GET /xp/history?limit=20
   */
  @Get('history')
  @UseGuards(JwtAuthGuard)
  async getUserXPHistory(
    @Request() req: any,
    @Query('limit') limit?: string,
  ) {
    const parsedLimit = limit ? parseInt(limit, 10) : 20;
    return this.xpService.getUserXPHistory(req.user.sub, parsedLimit);
  }

  /**
   * Session XP ekle (30 dakikada bir çağrılır)
   * POST /xp/session
   */
  @Post('session')
  @UseGuards(JwtAuthGuard)
  async addSessionXP(@Request() req: any) {
    return this.xpService.addSessionXP(req.user.sub);
  }
}
