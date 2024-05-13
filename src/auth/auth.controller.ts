import { Controller, Post, Body, HttpStatus, HttpCode } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from '../Database/entities';
import { ApiBearerAuth, ApiResponse, ApiTags, ApiBody } from '@nestjs/swagger';
import { LoginDto } from './Config/dtos';
import { CreateUserDto } from './Config/dtos';
import {
  CreateUserDoc,
  LoginDoc,
  LoginResponseDoc,
  UserCreatedDoc,
} from '../Docs';

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
    console.log(createAuthDto);
    return this.authService.register(createAuthDto);
  }
  @ApiBody({
    type: LoginDoc,
  })
  @ApiResponse({
    type: LoginResponseDoc,
  })
  @HttpCode(HttpStatus.ACCEPTED)
  @Post('login')
  async login(@Body() data: LoginDto) {
    return await this.authService.login(data);
  }
}
