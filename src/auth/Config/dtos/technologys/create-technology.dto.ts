import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTechnologyDto {
  @IsString({ message: 'TecName type must be a string.' })
  @IsNotEmpty({ message: 'TecName is required.' })
  tecName: string;

  @IsString({ message: 'CreatorsName type must be a string.' })
  @IsNotEmpty({ message: 'CreatorsName is required.' })
  creatorsName: string;
}
