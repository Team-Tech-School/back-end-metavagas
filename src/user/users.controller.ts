import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from '.';
import { UserRoleEnum, AuthGuard } from 'src/auth/config';
import { Roles } from 'src/auth/config/decorators/roles.decorator';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserCreatedDoc } from 'src/docs';
import { CurrentUser } from '../auth/config';
import { CurrentUserDto } from 'src/auth/config/dtos/Auth/CurrentUserDto/current-user.dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @ApiResponse({
    type: UserCreatedDoc,
  })
  @UseGuards(AuthGuard)
  @Roles(UserRoleEnum.admin)
  @HttpCode(HttpStatus.ACCEPTED)
  @Patch(':id')
  async updateUser(
    @Param(':id', ParseIntPipe) id: number,
    @Body() userData: Partial<User>,
  ): Promise<User> {
    return this.userService.updateUserById(id, userData);
  }

  @UseGuards(AuthGuard)
  @Roles(UserRoleEnum.admin)
  @HttpCode(HttpStatus.ACCEPTED)
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.userService.delete(id);
  }
  @ApiResponse({
    type: UserCreatedDoc,
  })
  @UseGuards(AuthGuard)
  @Roles(UserRoleEnum.admin)
  @Get()
  async list() {
    return await this.userService.listUsers();
  }
  @UseGuards(AuthGuard)
  @Roles(UserRoleEnum.admin)
  @Get(':id')
  async show(@Param('id', ParseIntPipe) id: number) {
    return await this.userService.getUserById(id);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  async profile(@CurrentUser() currentUser: { userId: number }) {
    const { userId } = currentUser;
    return await this.userService.profile(userId);
  }
}
