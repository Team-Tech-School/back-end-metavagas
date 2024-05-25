import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

import { UsersService } from '../user';
import { LoginDto } from './config/dtos';
import { CreateUserDto } from './config/dtos';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(createAuthDto: CreateUserDto) {
    try {
      return await this.userService.create(createAuthDto);
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async login(data: LoginDto) {
    try {
      const user = await this.userService.getUserBy(data.email);

      if (!user || !(await bcrypt.compare(data.password, user.password))) {
        throw new UnauthorizedException('Invalid email or password.');
      }

      const tokenPayload = {
        iss: 'arnia_meta_vagas',
        sub: 'users_auth',
        aud: 'arnia_users_meta_vagas',
        userId: user.id,
        userEmail: user.email,
        role: user.role,
      };

      return {
        accessToken: await this.jwtService.signAsync(tokenPayload),
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
