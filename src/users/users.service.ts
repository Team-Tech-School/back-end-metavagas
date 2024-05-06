import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { User, CreateUserDto } from '../entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  async create(payload: CreateUserDto) {
    try {
      try {
        if (await this.IsEmailExists(payload.email)) {
          throw new BadRequestException(
            `An user with this email: ${payload.email} already exists.`,
          );
        }
        const newUser = this.userRepository.create(payload);

        await this.userRepository.save(newUser);

        return newUser;
      } catch (error) {
        console.log(error);
        throw new HttpException(error.message, error.status);
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
}
