import { Test, TestingModule } from '@nestjs/testing';
import { BooksService } from './books.service';
import { TypeOrmModule, getRepositoryToken  } from '@nestjs/typeorm';
import { Books } from '../entities/book.entity';
import { BooksController } from '../controller/books.controller';
import { Repository } from 'typeorm';


describe('BooksService', () => {
  let service: BooksService;
  let controller: BooksController;
  let repository: Repository<Books>;


  const mockBooksRepo = {
    find: jest.fn().mockResolvedValue([{ id: 1, title: 'Test Book' }]),
    findOne: jest.fn().mockResolvedValue({ id: 1, title: 'Test Book' }),
    save: jest.fn().mockResolvedValue({ id: 1, title: 'Saved Book' }),
    delete: jest.fn().mockResolvedValue(true),
  };


  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BooksService,
        {
          provide: getRepositoryToken(Books),
          useValue: mockBooksRepo,
        },
      ],
    }).compile();


    service = module.get<BooksService>(BooksService);
    repository = module.get<Repository<Books>>(getRepositoryToken(Books));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all books', async () => {
    const books = await service.findAll();
    expect(books).toEqual([{ id: 1, title: 'Test Book' }]);
  });

});
