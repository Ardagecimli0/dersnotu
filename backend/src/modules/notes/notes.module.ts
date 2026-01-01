import { Module } from '@nestjs/common';
import { NotesService } from './notes.service';
import { NotesController } from './notes.controller';
import { GoogleIndexingService } from '../../services/google-indexing.service';

@Module({
  controllers: [NotesController],
  providers: [NotesService, GoogleIndexingService],
})
export class NotesModule {}
