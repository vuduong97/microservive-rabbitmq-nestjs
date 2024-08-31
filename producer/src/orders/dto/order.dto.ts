import { ApiProperty } from '@nestjs/swagger';

export class OrderDto {
  @ApiProperty()
  email: string;

  @ApiProperty()
  productName: string;

  @ApiProperty()
  quantity: number;
}
