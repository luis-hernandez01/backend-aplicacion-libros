import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import axios from 'axios';
import * as cheerio from 'cheerio';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Books } from '../entities/book.entity';

@Injectable()
export class ScrapingService {
  private baseUrl = 'https://books.toscrape.com';

  constructor(
    @InjectRepository(Books)
    private readonly bookRepository: Repository<Books>,
  ) { }

  async scrapeBooks(): Promise<Books[]> {
    const result: Books[] = [];
    let page = 1;

    while (result.length < 20) {
      try {
        const { data } = await axios.get(`${this.baseUrl}/catalogue/page-${page}.html`);
        const $ = cheerio.load(data);
        const books = $('.product_pod');

        for (const el of books.toArray()) {
          const title = $(el).find('h3 a').attr('title') || '';
          const priceText = $(el).find('.price_color').text().replace('£', '');
          const price = parseFloat(priceText);
          const rating = $(el).find('.star-rating').attr('class')?.split(' ')[1] || 'None';
          const stockText = $(el).find('.instock.availability').text().trim();
          const stockMatch = stockText.match(/\d+/);
          const stock = stockMatch ? parseInt(stockMatch[0], 10) : 0;
          const detailUrl = $(el).find('h3 a').attr('href');
          if (!detailUrl) continue;

          const detailData = await axios.get(`${this.baseUrl}/catalogue/${detailUrl}`);
          const $$ = cheerio.load(detailData.data);
          const category = $$('.breadcrumb li:nth-child(3) a').text().trim();

          if (!title || isNaN(price) || !category) continue;
          
          const book = this.bookRepository.create({
            title,
            price,
            rating,
            stock,
            category,
          });
          
          await this.bookRepository.save(book);

          result.push(book);
          if (result.length >= 20) break;
        }

        page++;
      } catch (error) {
        throw new HttpException({
          response: 'Data_not_found',
          status: 404,
          message: 'Data_not_found',
          name: 'HttpException',
        }, HttpStatus.NOT_FOUND);
        break;
      }
    }
    return result;
  }
} 