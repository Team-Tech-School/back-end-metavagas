import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../Database/entities';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  create(@Body() createAuthDto: CreateUserDto) {
    console.log(createAuthDto);
    return this.authService.register(createAuthDto);
  }
}
