import { Injectable, Logger } from '@nestjs/common';
import { google } from 'googleapis';
import * as path from 'path';
import * as fs from 'fs';

@Injectable()
export class GoogleIndexingService {
  private readonly logger = new Logger(GoogleIndexingService.name);
  private jwtClient: any;

  constructor() {
    try {
      // Google servis hesabı anahtarını yükle
      const keyPath = path.join(__dirname, '../../google-key.json');
      const key = JSON.parse(fs.readFileSync(keyPath, 'utf8'));

      this.jwtClient = new google.auth.JWT(
        key.client_email,
        null,
        key.private_key,
        ['https://www.googleapis.com/auth/indexing'],
        null
      );
    } catch (error) {
      this.logger.error('Google Indexing API anahtarı yüklenemedi:', error);
    }
  }

  /**
   * Google'a URL'yi indekslemesi için bildirim gönderir
   * @param pageUrl İndekslenecek sayfanın tam URL'si
   */
  async notifyGoogle(pageUrl: string): Promise<void> {
    try {
      if (!this.jwtClient) {
        this.logger.warn('Google Indexing API anahtarı yüklenemedi, bildirim gönderilemedi');
        return;
      }

      // JWT token'ı al
      const tokens = await this.jwtClient.authorize();
      
      // Google Indexing API'ye istek gönder
      const response = await fetch('https://indexing.googleapis.com/v1/urlNotifications:publish', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${tokens.access_token}`,
        },
        body: JSON.stringify({
          url: pageUrl,
          type: 'URL_UPDATED',
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        this.logger.error('Google Indexing API hatası:', errorData);
        throw new Error(`Google Indexing API hatası: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      this.logger.log(`Google Indexing API başarılı: ${pageUrl}`, data);
    } catch (error) {
      this.logger.error(`Google Indexing API hatası (${pageUrl}):`, error);
      // Hata olsa bile işlemi durdurmuyoruz, sadece logluyoruz
    }
  }
}

