import { Controller, Post, Body, ValidationPipe, BadRequestException, Delete, UseGuards, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from '../data/entities/user';
import { UsersService } from '../core/services/users.service';
import { UserLoginDTO } from '../models/user-login-dto';
import { UserRegisterDTO } from '../models/user-register-dto';
import { AuthGuard } from '@nestjs/passport';
import { ShowUserDTO } from '../models/user/show-user.dto';

@Controller('api')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) { }

  @Post('login')
  async login(@Body(new ValidationPipe({
    transform: true,
    whitelist: true,
  })) user: UserLoginDTO): Promise<{ token: string }> {
    const token = await this.authService.signIn(user);
    if (!token) {
      throw new BadRequestException(`Wrong credentials!`);
    }

    return { token };
  }

  @Post('register')
  async register(@Body(new ValidationPipe({
    transform: true,
    whitelist: true,
  })) user: UserRegisterDTO): Promise<User> {
    return await this.usersService.register(user);
  }

  @Delete('session')
  @UseGuards(AuthGuard())
  public async logoutUser() {
    return {message: 'Successful logout!'};
  }

  @Get()
  @UseGuards(AuthGuard())
  public async getAllUsers(): Promise<ShowUserDTO[]> {
    return await this.usersService.getAllUsers();
  }
}
