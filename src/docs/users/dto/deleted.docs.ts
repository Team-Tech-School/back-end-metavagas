import { ApiProperty } from '@nestjs/swagger';

export class DeletedDto {
  @ApiProperty({
    description: 'Deleted with success.',
    example: 'Deleted with success.',
  })
  message: string;
}
