import { Controller, Get, Post, HttpStatus, Res, Body, HttpException } from '@nestjs/common';
import { UserService } from './user.service';
import { CONTROLLER_ROUTES } from '../constant';
import { CreateUserModel } from './createUser.model';

@Controller(CONTROLLER_ROUTES.USER)
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get()
  async getAllUsers() {
    const users = await this.userService.findAll();
    return users;
  }

  @Post()
  async createUser( @Body() createUserModel: CreateUserModel) {
    try {
      const createdUser = await this.userService.createUser(createUserModel);
      return createdUser;
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }



}
