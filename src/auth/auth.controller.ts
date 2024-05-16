import { Controller, Post, Body, HttpStatus, HttpCode } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags, ApiBody } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { User } from '../database/entities';
import { LoginDto } from './config/dtos';
import { CreateUserDto } from './config/dtos';
import {
  CreateUserDoc,
  LoginDoc,
  LoginResponseDoc,
  UserCreatedDoc,
} from '../docs';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiBearerAuth()
  @ApiBody({ type: CreateUserDoc })
  @ApiResponse({ type: UserCreatedDoc })
  @HttpCode(HttpStatus.CREATED)
  @Post('register')
  async register(@Body() createAuthDto: CreateUserDto): Promise<User> {
    return this.authService.register(createAuthDto);
  }

  @ApiBody({
    type: LoginDoc,
  })
  @ApiResponse({
    type: LoginResponseDoc,
    status: 201,
    description: 'User successfully authenticated.',
  })
  @ApiResponse({
    status: 401,
    description: 'Email or password wrong.',
  })
  @HttpCode(HttpStatus.ACCEPTED)
  @Post('login')
  async login(@Body() data: LoginDto) {
    return await this.authService.login(data);
  }
}
