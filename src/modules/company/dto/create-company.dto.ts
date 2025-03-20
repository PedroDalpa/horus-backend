import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class CreateCompanyDto {
  @ApiProperty({ description: 'Company name', example: 'Acme Inc.' })
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  name: string

  @ApiProperty({
    description: 'Company address',
    example: '123 Main St, Anytown, USA'
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  address: string

  @ApiProperty({ description: 'Company phone number', example: '+1234567890' })
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  phone: string

  @ApiProperty({
    description: 'Company email address',
    example: 'contact@acme.com'
  })
  @IsNotEmpty()
  @IsEmail()
  @MaxLength(50)
  email: string
}
