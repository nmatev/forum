import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from './common/decorators/roles.decorator';
import { User } from './common/decorators/user.decorator';
import { UserRole } from './common/enums/user-role.enum';
import { RolesGuard } from './common/guards/role.guard';

@Controller()
export class AppController {

  @Get()
  @UseGuards(AuthGuard())
  root(@Req() request: any): { data: string } {
    console.log(request.user);
    return { data: `Yahooo I am logged in.` };
  }

  @Get('/admin')
  @Roles(UserRole.ADMIN)
  @UseGuards(AuthGuard(), RolesGuard)
  admin(@User() authenticatedUser) {
    console.log(authenticatedUser);
    return {
      data: `Yahooo, you are an admin!`,
    };
  }
}
