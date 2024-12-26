import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsStrongPassword,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({
    type: String,
    required: false,
    minLength: 3,
    maxLength: 50,
    example: 'John',
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(50)
  firstname?: string;

  @ApiProperty({
    type: String,
    required: false,
    minLength: 3,
    maxLength: 50,
    example: 'Doe',
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(50)
  lastname?: string;

  @ApiProperty({
    type: String,
    required: false,
    minLength: 5,
    maxLength: 100,
    example: 'john.doe@email.com',
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(100)
  @IsEmail()
  email?: string;

  @ApiProperty({
    type: String,
    required: false,
    minLength: 8,
    maxLength: 50,
    example: '!!S3cureP4ssword**',
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(50)
  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minNumbers: 1,
    minSymbols: 1,
    minUppercase: 1,
  })
  password?: string;

  @ApiProperty({
    type: Boolean,
    required: false,
    example: true,
  })
  @IsOptional()
  @IsBoolean()
  active?: boolean;
}
