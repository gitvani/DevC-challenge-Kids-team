import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from '../user/user.entity';
import { PHOTO_TYPE_ENUM } from './photoType.enum';

@Entity()
export class Photo {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  fileName: string;

  @Column()
  path: string;

  @Column()
  type: PHOTO_TYPE_ENUM;

  @ManyToOne(type => User, user => user.photos)
  user: User;

  @Column('uuid')
  userId: string; 

}