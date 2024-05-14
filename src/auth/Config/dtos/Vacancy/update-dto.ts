import {} from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

import { CreateUserDto } from '../Auth/create-user.dto';

export class UpdateVcancyDto extends PartialType(CreateUserDto) {}
