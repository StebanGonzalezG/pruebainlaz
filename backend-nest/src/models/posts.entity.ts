import { Column, Entity, ObjectId, ObjectIdColumn } from 'typeorm';

@Entity()
export class Posts {
  @ObjectIdColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  message: string;

  @Column()
  date: Date | string;

}