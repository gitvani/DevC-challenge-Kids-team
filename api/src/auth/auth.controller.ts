import { Controller, Post, Body } from '@nestjs/common';
import { CONTROLLER_ROUTES } from '../constant';
import { AuthService } from './auth.service';
import { LoginModel } from './login.model';

@Controller(CONTROLLER_ROUTES.AUTH)
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post()
    async login(@Body() loginModel: LoginModel) {
        const users = await this.authService.validateUser(loginModel.phoneNumber, loginModel.password);
        return users;
    }


}
