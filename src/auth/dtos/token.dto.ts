import { IsEmail, IsString, IsNotEmpty } from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';

export class TokenDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ description: 'Token' })
  readonly token: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Email token' })
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'attribute is valid token' })
  readonly isValid: boolean;
}
