import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../data/entities/user';
import { Repository } from 'typeorm';
import { FindUserDTO } from '../models/user/user-find-dto';

@Injectable()
export class AddFriendsService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) { }

  async addFriend(userToBeFriended: FindUserDTO, id: string): Promise<FindUserDTO> {

    const friendUser = await this.userRepo.findOne({ where: { id: userToBeFriended.id } });
    const currentUser = await this.userRepo.findOne(id);

    currentUser.friended = Promise.resolve([friendUser, ... await currentUser.friended]);
    await this.userRepo.save(currentUser);

    return this.userRepo.save(currentUser);
  }

  // const author = user.name;
  //   const savedPost = await this.forumPostRepo.save(createForumPost);
  //   const saveNewPost = { ...savedPost, user: author };
  //   return await plainToClass(ForumPost, saveNewPost, { excludeExtraneousValues: true });

  async removeFriend(unfriendUser: FindUserDTO, id: string): Promise<FindUserDTO> {
    const friendUser = await this.userRepo.findOne({ where: { id: unfriendUser.id } });
    const currentUser = await this.userRepo.findOne(id);
    const currentUserFriendlist = await currentUser.friended;
    currentUserFriendlist.filter(removedUser => {
      if (removedUser.id === friendUser.id) {
        removedUser.id = 'null';
      }
      return currentUser;
    })
    return await this.userRepo.save(currentUser);
  }
}
