import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
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
  console.log(`Backend listening on port ${backendPort}`);
}
void bootstrap();
