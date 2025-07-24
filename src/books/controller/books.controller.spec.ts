import { Test, TestingModule } from '@nestjs/testing';
import { BooksController } from './books.controller';
import { BooksService } from '../services/books.service';
import { ScrapingService } from '../services/scraping.service';

describe('BooksController', () => {
  let controller: BooksController;
  let service: BooksService;

  const mockBooksService = {
  findAll: jest.fn().mockResolvedValue([{ id: 1, title: 'Mock Book' }]),
  findById: jest.fn().mockResolvedValue({ id: 1, title: 'Mock Book' }),
  findByCategory: jest.fn().mockResolvedValue([{ id: 1, title: 'Mock Book', category: 'Fiction' }]), // <-- esta línea es crucial
};


  const mockScrapingService = {
    scrapeBooks: jest.fn().mockResolvedValue([{ id: 1, title: 'Scraped Book' }]),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BooksController],
      providers: [
        {
          provide: BooksService,
          useValue: mockBooksService,
        },
        {
          provide: ScrapingService,
          useValue: mockScrapingService,
        },
      ],
    }).compile();

    // controller = module.get<BooksController>(BooksController);
    // service = module.get<BooksService>(BooksService);
    controller = module.get<BooksController>(BooksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return list of books', async () => {
    const result = await controller.getBooks();
    expect(result).toEqual([{ id: 1, title: 'Mock Book', category: 'Fiction' }]);

  });

  it('should scrape books', async () => {
    const result = await controller.scrapeBooks();
    expect(result).toEqual([{ id: 1, title: 'Scraped Book' }]);
  });
});
