import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../core/services/users.service';
import { JwtPayload } from '../core/interfaces/jwt-payload';
import { User } from '../data/entities/user';
import { UserLoginDTO } from '../models/user-login-dto';

@Injectable()
export class AuthService {
  constructor(
    // Two dependey - jwtS & ysersS
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  async signIn(user: UserLoginDTO): Promise<string> {
    const userFound = await this.usersService.signIn(user);
    if (userFound) {
      return await this.jwtService.sign({email: userFound.email});
    }

    return null;
  }

  async validateUser(payload: JwtPayload): Promise<User | undefined> {
    return await this.usersService.validate(payload);
  }
}
