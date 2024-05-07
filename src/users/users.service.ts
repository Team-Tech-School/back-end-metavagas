import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { User } from '../Database/entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from 'src/auth/Config/dtos';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  async create(payload: CreateUserDto): Promise<User> {
    try {
      if (await this.IsEmailExists(payload.email)) {
        throw new BadRequestException(
          `An user with this email: ${payload.email} already exists.`,
        );
      } else {
        const newUser = this.userRepository.create(payload);

        await this.userRepository.save(newUser);

        return newUser;
      }
    } catch (err) {
      throw new HttpException(
        err.message,
        err?.status || HttpStatus.BAD_REQUEST,
      );
    }
  }
  async IsEmailExists(email: string): Promise<boolean> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (user) {
      return true;
    } else {
      return false;
    }
  }

  async getUserBy(email: string) {
    try {
      return await this.userRepository.findOne({
        where: { email },
        select: {
          email: true,
          id: true,
          password: true,
          role: true,
        },
      });
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, error.status);
    }
  }
}
