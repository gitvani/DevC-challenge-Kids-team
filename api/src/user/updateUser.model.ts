import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Photo } from '../photo/photo.entity';


export class updateUserModel {

  id: string;
  
  email: string;

  idCardNumber: string;

  fullName: string;

  male: boolean;

  dateOfBirth: string;

  homeTown: string;

  address: string;

  issuedDate: string;

  issuedPlace: string;

  photos: Photo[];

}