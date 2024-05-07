import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from '../Database/entities';
import { ApiTags } from '@nestjs/swagger';
import { LoginDto } from './Config/dtos';
import { CreateUserDto } from './Config/dtos';

@ApiTags('users')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() createAuthDto: CreateUserDto): Promise<User> {
    console.log(createAuthDto);
    return this.authService.register(createAuthDto);
  }
  @Post('login')
  async login(@Body() data: LoginDto) {
    return await this.authService.login(data);
  }
}
