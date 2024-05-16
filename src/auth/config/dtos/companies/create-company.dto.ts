import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCompanyDto {
  @IsString({ message: 'name must be a string' })
  @IsNotEmpty({ message: 'name must not be empty' })
  name: string;

  @IsString({ message: 'city must be a string' })
  @IsNotEmpty({ message: 'city must not be empty' })
  city: string;

  @IsString({ message: 'state must be a string' })
  @IsNotEmpty({ message: 'state must not be empty' })
  state: string;

  @IsString({ message: 'address must be a string' })
  @IsNotEmpty({ message: 'address must not be empty' })
  address: string;

  @IsString({ message: 'foundedAt must be a string' })
  @IsNotEmpty({ message: 'foundedAt must not be empty' })
  foundedAt: string;

  @IsString({ message: 'description must be a string' })
  @IsNotEmpty({ message: 'description must not be empty' })
  description: string;
}
