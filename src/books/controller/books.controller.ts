import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Query, HttpException, HttpStatus } from '@nestjs/common';
import { BooksService } from '../services/books.service';
import { ScrapingService } from '../services/scraping.service';

@Controller('books')
export class BooksController {
  constructor(
    private readonly booksService: BooksService,
    private readonly scrapingService: ScrapingService,
  ) { }


  @Post('scrape-books')
  scrapeBooks() {
    return this.scrapingService.scrapeBooks();
  }


  @Get()
  getBooks(@Query('category') category?: string) {
    return this.booksService.findByCategory(category);
  }


  @Get(':id')
  ListBookShear(@Param('id') id: number) {
    return this.booksService.getListBookid(id);
  }

  @Delete(':id')
  Delete_book(@Param('id', ParseIntPipe) id: number) {
    return this.booksService.delete(id);
  }
}