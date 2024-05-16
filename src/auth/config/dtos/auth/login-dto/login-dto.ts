import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @IsNotEmpty({ message: 'email is required' })
  @IsEmail()
  email: string;

  @IsString({ message: 'password must be string' })
  @IsNotEmpty({ message: 'password Required' })
  password: string;
}
