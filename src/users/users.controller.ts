import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { User } from '../database/entities/index';
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
import {
  UserRoleEnum,
  AuthGuard,
  RoleGuard,
  CurrentUser,
  CurrentUserDto,
  Roles,
} from '../auth/config';
import {
  ApiDeleteUserDocs,
  ApiFindAllUserDocs,
  ApiFindOneUserDocs,
  ApiProfileUserDocs,
  ApiUpdateUserDocs,
} from '../docs';

@ApiBearerAuth()
@ApiTags('Users')
@Controller('user')
@UseGuards(AuthGuard)
export class UsersController {
  constructor(private userService: UsersService) {}

  @UseGuards(RoleGuard)
  @Roles(UserRoleEnum.admin)
  @HttpCode(HttpStatus.ACCEPTED)
  @ApiUpdateUserDocs()
  @Patch(':id')
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() userData: Partial<User>,
  ): Promise<User> {
    return this.userService.updateUserById(id, userData);
  }

  @UseGuards(RoleGuard)
  @Roles(UserRoleEnum.admin)
  @ApiFindAllUserDocs()
  @Get()
  async list() {
    return await this.userService.listUsers();
  }

  @ApiProfileUserDocs()
  @Get('profile')
  profile(@CurrentUser() user: CurrentUserDto) {
    console.log('user', user);
    return this.userService.profile(user.userId);
  }

  @UseGuards(RoleGuard)
  @Roles(UserRoleEnum.admin)
  @HttpCode(HttpStatus.ACCEPTED)
  @ApiFindOneUserDocs()
  @Get(':id')
  async show(@Param('id', ParseIntPipe) id: number) {
    return await this.userService.getUserById(id);
  }

  @UseGuards(RoleGuard)
  @Roles(UserRoleEnum.admin)
  @HttpCode(HttpStatus.ACCEPTED)
  @ApiDeleteUserDocs()
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.userService.delete(id);
  }
}
