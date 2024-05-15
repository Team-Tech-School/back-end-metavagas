import {} from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

import { CreateUserDto } from '../auth/create-user.dto';

export class UpdateVcancyDto extends PartialType(CreateUserDto) {}
