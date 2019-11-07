import { Controller, Post, UseGuards, Body, ValidationPipe, Param, Delete } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AddFriendsService } from './add-friends.service';
import { FindUserDTO } from '../models/user/user-find-dto';

@Controller('users')
export class AddFriendsController {

  constructor(
    private readonly addFriendsService: AddFriendsService,
  ) { }

  @Post('/:id/friends')
  @UseGuards(AuthGuard())
  async update(@Body(new ValidationPipe({ whitelist: true, transform: true }))
  // tslint:disable-next-line: no-shadowed-variable
  userToBeFriended: FindUserDTO,
    // tslint:disable-next-line: align
    @Param('id') id: string): Promise<FindUserDTO> {
    return await this.addFriendsService.addFriend(userToBeFriended, id);
  }

  @Delete('/:id/friends')
  @UseGuards(AuthGuard())
  async deleteUser(@Body(new ValidationPipe({ whitelist: true, transform: true }))
  userToBeRemoved: FindUserDTO,

// tslint:disable-next-line: align
    @Param('id') id: string): Promise<FindUserDTO> {
    return await this.addFriendsService.removeFriend(userToBeRemoved, id);
  }
}
