import { Module } from '@nestjs/common';
import { BooksService } from './services/books.service';
import { ScrapingService } from './services/scraping.service';
import { BooksController } from './controller/books.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Books } from './entities/book.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Books])],
  controllers: [BooksController],
  providers: [BooksService, ScrapingService],
})
export class BooksModule {}
