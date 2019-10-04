import { Injectable, UseInterceptors, Post, UploadedFile } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/user.entity';
import { Photo } from './photo.entity';
import { Repository } from '../../node_modules/typeorm';
import { CreatePhotoModel } from './createPhoto.model';


@Injectable()
export class PhotoService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @InjectRepository(Photo)
        private readonly photoRepository: Repository<Photo>,
    ) { }

    async createPhoto(createPhotoModel: CreatePhotoModel) {
    console.log("TCL: PhotoService -> createPhoto -> createPhotoModel", createPhotoModel)

        try {
            const user = await this.userRepository.findOneOrFail({ id: createPhotoModel.userId });
            const createdPhoto = await this.photoRepository.save({
                fileName: createPhotoModel.fileName,
                path: createPhotoModel.path,
                type: createPhotoModel.type,
                userId: user.id,
            });
            return createdPhoto;
        } catch (err) {
            throw err;
        }
    }

    async findPhotosByUserId(userId: string): Promise<Photo[]> {
        const photos = await this.photoRepository.find({ userId: userId });
        return photos;
    }


}