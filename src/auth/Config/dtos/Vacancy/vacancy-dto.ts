import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateVacancyDto {
  @IsString({ message: 'Job vacancy is mandatory' })
  @IsNotEmpty({ message: 'Vacancy role is required ' })
  vacancyRole: string;

  @IsNumber()
  @IsNotEmpty({ message: 'wage is required' })
  wage: number;

  @IsString({ message: 'location must be a string' })
  @IsNotEmpty({ message: 'Location is required' })
  location: string;

  @IsString({ message: 'Vacancy type must be a string' })
  @IsNotEmpty({ message: 'Vacancy type is mandatory' })
  vacancyType: string;

  @IsString({ message: 'description must be a string' })
  @IsNotEmpty({ message: 'Description is required' })
  vacancyDescription: string;

  @IsString({ message: 'level must be a string' })
  @IsNotEmpty({ message: 'level is required' })
  level: string;

  @IsString({ message: 'company must be a string' })
  @IsNotEmpty({
    message:
      "The name of the company is necessary to create the vacancy, if you can't find your company it must be created first!",
  })
  companyId: string;

  @IsString({ message: 'advertiser must be a string' })
  @IsNotEmpty({
    message: 'id not found! Please add a valid advertiser!',
  })
  advertiserId: string;
}
