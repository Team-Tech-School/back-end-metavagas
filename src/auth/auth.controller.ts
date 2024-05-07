import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
<<<<<<< HEAD
import { CreateUserDto, User } from '../Database/entities';
=======
import { CreateUserDto } from '../Database/entities';
import { ApiTags } from '@nestjs/swagger';
>>>>>>> origin/main

@ApiTags('users')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() createAuthDto: CreateUserDto): Promise<User> {
    console.log(createAuthDto);
    return this.authService.register(createAuthDto);
  }
}
