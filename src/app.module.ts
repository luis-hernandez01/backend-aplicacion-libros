import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BooksModule } from './books/books.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';



@Module({
  imports: [ ConfigModule.forRoot({
      isGlobal: true, 
    }),
     TypeOrmModule.forRoot({
    type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT || '5432', 10),
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [
        __dirname + '/**/*.entity{.ts,.js}'
      ],
      synchronize: true,
  }),
  BooksModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
