import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { UserRoleEnum } from '../../enums/userRoleEnum';

export class CreateVacancyDto {
  @IsString()
  @IsNotEmpty()
  vacancyRole: string;

  @IsNumber()
  @IsNotEmpty()
  wage: number;

  @IsString()
  @IsNotEmpty()
  location: string;

  @IsString()
  @IsNotEmpty()
  vacancyType: string;

  @IsString()
  @IsNotEmpty()
  vacancyDescription: string;

  @IsString()
  @IsNotEmpty()
  level: string;
}
