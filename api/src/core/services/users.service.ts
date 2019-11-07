import { Injectable } from '@nestjs/common';
import { User } from '../../data/entities/user';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserLoginDTO } from '../../models/user-login-dto';
import { UserRegisterDTO } from '../../models/user-register-dto';
import { JwtPayload } from '../interfaces/jwt-payload';
import { ForumPost } from '../../data/entities/post';
import { plainToClass } from 'class-transformer';
import { ShowAllUsersDTO } from '../../models/user/show-all-users.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(ForumPost) private readonly forumPostRepository: Repository<ForumPost>,
  ) {
  }

  public async signIn(user: UserLoginDTO): Promise<User | undefined> {
    return await this.userRepository.findOne({
      where: {
        ...user,
      },
    });
  }

  public async register(user: UserRegisterDTO): Promise<User | undefined> {
    const newUser = await this.userRepository.save({ ...user });
    const savedUser = await this.userRepository.save(newUser);
    const saveNewUser = { ...savedUser };
    return await plainToClass(User, saveNewUser, { excludeExtraneousValues: true });
  }

  public async validate(payload: JwtPayload): Promise<User | undefined> {
    return await this.userRepository.findOne({
      where: {
        ...payload,
      },
    });
  }

  public async getAllUsers(): Promise<ShowAllUsersDTO[]> {
    const result = await this.userRepository.find();
    return plainToClass(ShowAllUsersDTO, result, { excludeExtraneousValues: true });
  }
}
