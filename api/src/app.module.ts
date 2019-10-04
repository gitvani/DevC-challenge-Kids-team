import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MulterModule } from '@nestjs/platform-express';
import * as multer from 'multer';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { User } from './user/user.entity';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { Photo } from './photo/photo.entity';
import { PhotoService } from './photo/photo.service';
import { PhotoController } from './photo/photo.controller';


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './upload')
  },
  filename: function (req, file, cb) {
    const fileName = file.fieldname + '-' + Date.now() + '.' + file.mimetype.split('/')[1];
    cb(null, fileName);
  }
})

const ENTITIES = [
  User,
  Photo,
]
const CONTROLLERS = [
  AppController,
  UserController,
  AuthController,
  PhotoController,
]

const SERVICES = [
  AppService,
  UserService,
  AuthService,
  PhotoService,
]
@Module({
  imports: [
    MulterModule.register({
      storage: storage,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST ? process.env.DB_HOST : '0.0.0.0',
      port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 3308,
      username: process.env.DB_USERNAME ? process.env.DB_USERNAME : 'admin',
      password: process.env.DB_PASSWORD ? process.env.DB_PASSWORD : 'adminpw',
      database: process.env.DB_DATABASE ? process.env.DB_DATABASE : 'idcarddetection',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([...ENTITIES]),
  ],
  controllers: [...CONTROLLERS],
  providers: [...SERVICES],
})
export class AppModule { }
