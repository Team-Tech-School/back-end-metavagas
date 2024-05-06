import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../entities';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  create(@Body() createAuthDto: CreateUserDto) {
    console.log(createAuthDto);
    return this.authService.register(createAuthDto);
  }
}
