import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
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
      await this.IsEmailExists(payload.email);
      try {
        const newUser = this.userRepository.create(payload);

        await this.userRepository.save(newUser);

        return newUser;
      } catch (err) {
        throw new BadRequestException(
          `An user with this email: ${payload.email} already exists.`,
        );
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

  async getUserById(id: number) {
    try {
      const user = await this.userRepository.findOne({ where: { id } });
      if (!user) {
        throw new NotFoundException(`user not located.`);
      }
      return user;
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
  async updateUserById(userId: number, userData: Partial<User>): Promise<User> {
    try {
      await this.getUserById;

      await this.userRepository.update(userId, userData);

      return await this.getUserById(userId);
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, error.status);
    }
  }
  async delete(id: number) {
    try {
      await this.getUserById(id);

      await this.userRepository.softDelete(id);

      return { response: 'User deleted with success.' };
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, error.status);
    }
  }
  async listUsers() {
    try {
      return await this.userRepository.find();
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, error.status);
    }
  }

  async profile(id: number) {
    try {
      return await this.userRepository.findOne({
        where: { id },
        relations: {
          vacancy: true,
        },
      });
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, error.status);
    }
  }
}
