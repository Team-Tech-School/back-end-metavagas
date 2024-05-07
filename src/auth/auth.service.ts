import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../Database/entities';
import { UsersService } from '../users';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UsersService) {}
  async register(createAuthDto: CreateUserDto) {
    try {
      return this.userService.create(createAuthDto);
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
