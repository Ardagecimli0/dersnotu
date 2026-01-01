import { Injectable, Logger } from '@nestjs/common';
import { google } from 'googleapis';

@Injectable()
export class GoogleIndexingService {
  private readonly logger = new Logger(GoogleIndexingService.name);
  private jwtClient: any;

  constructor() {
    try {
      // JSON dosyasından okumak yerine ENV'den alıyoruz
      const clientEmail = process.env.GOOGLE_CLIENT_EMAIL;
      const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');

      if (!clientEmail || !privateKey) {
        this.logger.error('Google Indexing API kimlik bilgileri eksik (ENV)!');
        return;
      }

      // TypeScript hatasını önlemek için objeye dayalı yapı kullanıyoruz
      this.jwtClient = new google.auth.JWT({
        email: clientEmail,
        key: privateKey,
        scopes: ['https://www.googleapis.com/auth/indexing'],
      });
    } catch (error) {
      this.logger.error('Google Indexing API istemcisi oluşturulamadı:', error);
    }
  }

  async notifyGoogle(pageUrl: string): Promise<void> {
    try {
      if (!this.jwtClient) {
        this.logger.warn('İndeksleme istemcisi hazır değil, bildirim gönderilemedi.');
        return;
      }

      const tokens = await this.jwtClient.authorize();
      
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

      const data = await response.json();

      if (!response.ok) {
        this.logger.error('Google Indexing API hatası:', data);
      } else {
        this.logger.log(`Google Indexing API başarılı: ${pageUrl}`);
      }
    } catch (error) {
      this.logger.error(`Google Indexing API hatası (${pageUrl}):`, error);
    }
  }
}