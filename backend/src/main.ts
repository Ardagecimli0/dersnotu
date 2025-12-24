import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);
    
    app.enableCors({
      origin: true, // Tüm origin'lere izin ver (test için)
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization'],
    });
    
    app.useGlobalPipes(new ValidationPipe());
    
    // Heroku'da backend internal port'ta çalışır, frontend Heroku'nun PORT'unu kullanır
    const backendPort = process.env.BACKEND_PORT || process.env.PORT || 3002;
    await app.listen(backendPort);
    console.log(`✅ Backend listening on port ${backendPort}`);
    console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`🔗 DATABASE_URL: ${process.env.DATABASE_URL ? 'Set (hidden)' : 'NOT SET!'}`);
  } catch (error) {
    console.error('❌ Failed to start backend:', error);
    process.exit(1);
  }
}
void bootstrap();
