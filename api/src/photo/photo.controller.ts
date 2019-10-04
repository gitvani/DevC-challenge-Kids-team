import { Controller, UseInterceptors, Post, UploadedFile, Body, HttpException, HttpStatus, Get, Param } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CONTROLLER_ROUTES } from '../constant';
import { CreatePhotoModel } from './createPhoto.model';
import { PhotoService } from './photo.service';

@Controller(CONTROLLER_ROUTES.PHOTO)
export class PhotoController {
    constructor(
        private readonly photoService: PhotoService,
    ) { }

    @Post('upload')
    @UseInterceptors(FileInterceptor('file'))
    uploadFile(@UploadedFile() file) {
        return file;
    }

    @Get('user/:userId')
    async getUserPhotos(@Param('userId') userId) {
        try {
            const photos = await this.photoService.findPhotosByUserId(userId);
            return photos;
        } catch (err) {
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
        }
    }


    @Post()
    async createPhoto(@Body() createPhotoModel: CreatePhotoModel) {
        try {
            const createdPhoto = await this.photoService.createPhoto(createPhotoModel);
            return createdPhoto;
        } catch (err) {
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
        }
    }
}
