import { IsEmail, IsString, IsNotEmpty } from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';

export class EmailDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ description: 'To: <email@dominio.com>' })
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Message email' })
  readonly message: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Subject email' })
  readonly subject: string;
}
