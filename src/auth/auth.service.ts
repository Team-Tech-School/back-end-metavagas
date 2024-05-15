import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { User, UsersService } from '../user';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './config/dtos';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './config/dtos';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
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
      const { email, password } = data;
      const user = await this.userRepository.findOne({
        where: { email },
        select: { id: true, email: true, password: true },
      });
      console.log(user);
      if (!user || !(await bcrypt.compare(password, user.password))) {
        throw new UnauthorizedException('Email or password wrong.');
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
      throw new HttpException(error.message, error.status);
    }
  }
}
