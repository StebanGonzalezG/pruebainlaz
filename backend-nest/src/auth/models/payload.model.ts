import { ObjectId } from 'typeorm';

export interface PayloadToken {
  role: string;
  sub: number; 
}
