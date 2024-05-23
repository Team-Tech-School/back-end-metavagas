import { ApiProperty, PartialType } from '@nestjs/swagger';

import { CreateUserDoc } from './create-user.docs';

export class UserCreatedDoc extends PartialType(CreateUserDoc) {
  @ApiProperty({
    type: Number,
    example: 1,
    description: 'Users unique identifier.',
  })
  id: number;

  @ApiProperty({
    type: Date,
    example: new Date(),
    description: 'Date when user was created.',
  })
  createdAt: Date;

  @ApiProperty({
    type: Date,
    example: new Date(),
    description: 'Date when user was updated.',
  })
  updatedAt: Date;

  @ApiProperty({
    type: Date,
    example: null,
    description: 'Date when user was deleted.',
  })
  deletedAt?: Date;

  @ApiProperty({
    type: String,
    example: '$2b$10$DNp4doLzg39i8l2NsK6aFOTTzwfQ5Epal1VMX3AF1caTG/N8uuGA',
    required: true,
    description: 'Users password.',
  })
  password: string;
}
