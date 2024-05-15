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
  Request,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';

import { UsersService } from './user.service';
import { UserRoleEnum, AuthGuard, RoleGuard } from 'src/auth/config';
import { Roles } from 'src/auth/config/decorators/roles.decorator';
import { UserCreatedDoc } from 'src/docs';
import { CurrentUser } from '../auth/config';
import { User } from '../database/entities/index';
import { CurrentUserDto } from 'src/auth/config/dtos/auth/CurrentUserDto/current-user.dto';

@ApiBearerAuth()
@ApiTags('user')
@Controller('user')
@UseGuards(AuthGuard, RoleGuard)
export class UsersController {
  constructor(private userService: UsersService) {}

  @Roles(UserRoleEnum.admin)
  @Patch(':id')
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() userData: Partial<User>,
  ): Promise<User> {
    return this.userService.updateUserById(id, userData);
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
  @Get('profile')
  profile(@CurrentUser() user: CurrentUserDto) {
    console.log('user', user);
    return this.userService.profile(user.userId);
  }
  @ApiResponse({
    type: UserCreatedDoc,
  })
  @Roles(UserRoleEnum.admin)
  @HttpCode(HttpStatus.ACCEPTED)
  @Get(':id')
  async show(@Param('id', ParseIntPipe) id: number) {
    return await this.userService.getUserById(id);
  }
  @Roles(UserRoleEnum.admin)
  // @HttpCode(HttpStatus.ACCEPTED)
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.userService.delete(id);
  }
}
