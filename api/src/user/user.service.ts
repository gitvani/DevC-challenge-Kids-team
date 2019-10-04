import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserModel } from './createUser.model';
import { Photo } from '../photo/photo.entity';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) { }

    findAll(): Promise<User[]> {
        const users = this.userRepository.find();
        return users;
    }

    async finById(id: string): Promise<User | undefined> {
        const user = await this.userRepository.findOne({
            id: id,
        });
        return user;
    }

    async findByPhone(phoneNumber: string): Promise<User | undefined> {
        const user = await this.userRepository.findOne({
            phoneNumber: phoneNumber,
        });
        return user;
    }

    async createUser(createUserModel: CreateUserModel) {
        try {
            const createdUser = await this.userRepository.save({
                phoneNumber: createUserModel.phoneNumber,
                password: createUserModel.password,
                approved: false,
            });
            return createdUser;
        } catch (err) {
            throw err;
        }
    }

}
