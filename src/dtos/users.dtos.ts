import {
  IsNumber,
  IsEmail,
  IsString,
  IsNotEmpty,
  IsUrl,
} from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  readonly password: string;

  @IsString()
  @IsNotEmpty()
  readonly lastname: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
