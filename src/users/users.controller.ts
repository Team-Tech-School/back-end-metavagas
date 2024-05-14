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

import { UsersService } from './users.service';
import { UserRoleEnum, AuthGuard } from 'src/auth/Config';
import { Roles } from 'src/auth/Config/decorators/roles.decorator';
import { UserCreatedDoc } from 'src/Docs';
import { CurrentUser } from '../auth/Config';
import { User } from '../Database/entities/index';

@Controller('users')
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
