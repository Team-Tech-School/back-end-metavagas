import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from '../auth/Config/dtos';
import bcrypt from 'bcrypt';
import { CreateUserDto } from './Config/dtos';

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
      console.log(user);
      if (!user || !(await bcrypt.compare(data.password, user.password))) {
        throw new UnauthorizedException('Email or password wrong.');
      }

      const tokenPayload = {
        userId: user.id,
        userEmail: user.email,
        role: user.role,
      };

      return { token: this.jwtService.sign(tokenPayload) };
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, error.status);
    }
  }
}
