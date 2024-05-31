import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

import { UserRoleEnum } from '../../enums/userRoleEnum';

export class CreateUserDto {
  @IsString({ message: 'Name must be a string' })
  @IsNotEmpty({ message: 'Name must not be empty' })
  name: string;

  @IsString({ message: 'Email must be a string' })
  @IsEmail()
  email: string;

  @IsString({ message: 'Password must be a string' })
  @IsNotEmpty({ message: 'Password must not be empty' })
  password: string;

  @IsEnum(UserRoleEnum)
  @IsOptional({ message: 'Role must be a valid user role' })
  role?: UserRoleEnum;
}
