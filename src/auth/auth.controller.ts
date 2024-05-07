import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from '../Database/entities';
import { ApiBearerAuth, ApiResponse, ApiTags, ApiBody } from '@nestjs/swagger';
import { LoginDto } from './Config/dtos';
import { CreateUserDto } from './Config/dtos';
import { CreateUserDoc, UserCreatedDoc } from '../Docs';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiBearerAuth()
  @ApiBody({ type: CreateUserDoc })
  @ApiResponse({ type: UserCreatedDoc })
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
