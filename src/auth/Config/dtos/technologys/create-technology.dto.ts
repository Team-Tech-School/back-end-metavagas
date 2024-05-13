import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTechnologyDto {
  @IsString({ message: 'TecName type must be a string.' })
  @IsNotEmpty({ message: 'tecName is required.' })
  tecName: string;

  @IsString({ message: 'CreatorsName type must be a string.' })
  @IsNotEmpty({ message: 'creatorsName is required.' })
  creatorsName: string;
}
