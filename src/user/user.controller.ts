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
import { ApiResponse } from '@nestjs/swagger';

import { UsersService } from './user.service';
import { UserRoleEnum, AuthGuard } from 'src/auth/config';
import { Roles } from 'src/auth/config/decorators/roles.decorator';
import { UserCreatedDoc } from 'src/docs';
import { CurrentUser } from '../auth/config';
import { User } from '../database/entities/index';

@Controller('user')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Roles(UserRoleEnum.admin)
  @HttpCode(HttpStatus.ACCEPTED)
  @Patch(':id')
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() userData: Partial<User>,
  ): Promise<User> {
    return this.userService.updateUserById(id, userData);
  }

  @Roles(UserRoleEnum.admin)
  @HttpCode(HttpStatus.ACCEPTED)
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.userService.delete(id);
  }

  @ApiResponse({
    type: UserCreatedDoc,
    isArray: true,
  })
  @Roles(UserRoleEnum.admin)
  @Get()
  async list() {
    return await this.userService.listUsers();
  }

  @ApiResponse({
    type: UserCreatedDoc,
  })
  @Roles(UserRoleEnum.admin)
  @Get(':id')
  async show(@Param('id', ParseIntPipe) id: number) {
    return await this.userService.getUserById(id);
  }

  @Roles(UserRoleEnum.admin)
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.ACCEPTED)
  @Get('profile')
  async profile(@CurrentUser() currentUser: { userId: number }) {
    const { userId } = currentUser;
    return await this.userService.profile(userId);
  }
}
