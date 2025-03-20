import { IsEmail, IsString, IsOptional, MaxLength } from 'class-validator'
import { ApiPropertyOptional } from '@nestjs/swagger'
import { PartialType } from '@nestjs/mapped-types'
import { CreateCompanyDto } from './create-company.dto'

export class UpdateCompanyDto extends PartialType(CreateCompanyDto) {
  @ApiPropertyOptional({ description: 'Company name', example: 'Acme Inc.' })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  name?: string

  @ApiPropertyOptional({
    description: 'Company address',
    example: '123 Main St, Anytown, USA'
  })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  address?: string

  @ApiPropertyOptional({
    description: 'Company phone number',
    example: '+1234567890'
  })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  phone?: string

  @ApiPropertyOptional({
    description: 'Company email address',
    example: 'contact@acme.com'
  })
  @IsOptional()
  @IsEmail()
  @MaxLength(50)
  email?: string
}
