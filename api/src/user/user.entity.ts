import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Photo } from '../photo/photo.entity';

@Entity()
export class User {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  phoneNumber: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  idCardNumber: string;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  male: boolean;

  @Column({ nullable: true })
  dateOfBirth: number;

  @Column({ nullable: true })
  homeTown: string;

  @Column({ nullable: true })
  address: string;

  @Column({ nullable: true })
  issuedDate: number;

  @Column({ nullable: true })
  issuedPlace: string;

  @Column({ nullable: true })
  approved: boolean;

  @OneToMany(() => Photo, photo => photo.userId)
  photos: Photo[];

}