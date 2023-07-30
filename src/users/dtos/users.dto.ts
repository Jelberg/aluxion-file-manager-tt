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
  @ApiProperty({ description: 'User Name' })
  readonly name: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ description: 'User email address' })
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'User pasword' })
  readonly password: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'User lastname' })
  readonly lastname: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
