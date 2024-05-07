import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto, User } from '../Database/entities';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() createAuthDto: CreateUserDto): Promise<User> {
    console.log(createAuthDto);
    return this.authService.register(createAuthDto);
  }
}
