import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(50)
  @ApiProperty({
    type: String,
    required: true,
    minLength: 3,
    maxLength: 50,
    example: 'John',
  })
  firstname: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(50)
  @ApiProperty({
    type: String,
    required: true,
    minLength: 3,
    maxLength: 50,
    example: 'Doe',
  })
  lastname: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(100)
  @IsEmail()
  @ApiProperty({
    type: String,
    required: true,
    minLength: 5,
    maxLength: 100,
    example: 'john.doe@email.com',
  })
  email: string;

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
  @ApiProperty({
    type: String,
    required: true,
    minLength: 8,
    maxLength: 50,
    example: '!!Str0ngP4ssw0rd**',
  })
  password: string;
}
