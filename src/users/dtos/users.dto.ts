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

export class LoginUserDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ description: 'Email address from Login' })
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Password address from Login' })
  password: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
