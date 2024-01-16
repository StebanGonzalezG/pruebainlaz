import { Column, Entity, ObjectId, ObjectIdColumn } from 'typeorm';

@Entity()
export class Users {
  @ObjectIdColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

}