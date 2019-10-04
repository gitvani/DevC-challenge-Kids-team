import { PHOTO_TYPE_ENUM } from './photoType.enum';

export interface CreatePhotoModel {
    fileName: string;
    path: string;
    type: PHOTO_TYPE_ENUM;
    userId: string;
}