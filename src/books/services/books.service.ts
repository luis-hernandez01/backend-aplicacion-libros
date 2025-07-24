import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Books } from '../entities/book.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BooksService {

  constructor(
    @InjectRepository(Books)
    private readonly bookRepo: Repository<Books>,
  ) { }

  findAll() {
    return this.bookRepo.find();
  }

  async findByCategory(category?: string) {
    let books;
    if (category) {
      books = await this.bookRepo.findOne({ where: { category } })
    } else {
      books = await this.findAll();
    }
    if (!books || books.length === 0) {
      return new HttpException('Data_not_found', HttpStatus.NOT_FOUND);
    }
    return books;
  }


  async getListBookid(id: number) {

    const result = await this.bookRepo.findOne({ where: { id } })
    if (!result) {
      return new HttpException('Data_not_found', HttpStatus.NOT_FOUND);
    }
    return result;
  }

  async delete(id: number) {
    const result = await this.bookRepo.delete({ id })
    if (result.affected === 0) {
      return new HttpException('Data_not_found', HttpStatus.NOT_FOUND);
    }
    return new HttpException('Data_deleted_successfully', HttpStatus.OK);
  }
}