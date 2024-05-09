import {} from 'class-validator';
import { UserRoleEnum } from '../../enums/userRoleEnum';
import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from '../Auth/create-user.dto';

export class UpdateVcancyDto extends PartialType(CreateUserDto) {}
