import {
  IsNumber,
  IsEmail,
  IsString,
  IsNotEmpty,
  IsUrl,
} from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ description: 'User email address' })
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  readonly password: string;

  @IsString()
  @IsNotEmpty()
  readonly lastname: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
