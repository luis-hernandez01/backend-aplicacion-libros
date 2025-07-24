import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

// export class Book {}
@Entity()
export class Books {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column('decimal')
  price: number;

  @Column()
  rating: string;

  @Column()
  stock: number;


  @Column()
  category: string;
}