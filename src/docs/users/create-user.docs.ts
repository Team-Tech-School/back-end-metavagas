import { ApiProperty } from '@nestjs/swagger';

import { UserRoleEnum } from '../../auth/config/enums/user.roleEnum';

export class CreateUserDoc {
  @ApiProperty({
    type: String,
    example: 'Francisco',
    required: true,
    description: 'Users first name.',
  })
  name: string;

  @ApiProperty({
    type: String,
    example: 'example@gmail.com',
    required: true,
    description: 'Users email for login.',
  })
  email: string;

  @ApiProperty({
    type: String,
    example: '12345',
    required: true,
    description: 'Users password.',
  })
  password: string;

  @ApiProperty({
    type: UserRoleEnum,
    enum: UserRoleEnum,
    example: UserRoleEnum.candidate,
    required: false,
    description: 'Users role.',
    default: UserRoleEnum.candidate,
  })
  role?: UserRoleEnum;
}
