import { Controller, Post, Body, HttpStatus, HttpCode } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { User } from '../database/entities';
import { LoginDto, CreateUserDto } from './config/dtos';
import { ApiLoginDocs, ApiRegisterDocs } from '../docs';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @HttpCode(HttpStatus.CREATED)
  @ApiRegisterDocs()
  @Post('register')
  async register(@Body() createAuthDto: CreateUserDto): Promise<User> {
    return this.authService.register(createAuthDto);
  }

  @HttpCode(HttpStatus.ACCEPTED)
  @ApiLoginDocs()
  @Post('login')
  async login(@Body() data: LoginDto) {
    return await this.authService.login(data);
  }
}
