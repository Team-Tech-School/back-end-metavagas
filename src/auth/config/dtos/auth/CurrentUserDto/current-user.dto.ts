import { IsNotEmpty, IsNumber } from 'class-validator';

export class CurrentUserDto {
  @IsNumber()
  @IsNotEmpty({ message: 'userId Required' })
  userId: number;

  @IsNotEmpty({ message: 'userId Required' })
  email: string;
}
