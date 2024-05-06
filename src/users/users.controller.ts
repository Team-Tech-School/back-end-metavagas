import { Controller, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from '../entities';

@Controller('users')
export class UsersController {}
