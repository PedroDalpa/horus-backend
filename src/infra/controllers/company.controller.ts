import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  ParseUUIDPipe
} from '@nestjs/common'
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger'
import { CreateCompanyDto } from '../../modules/company/dto/create-company.dto'
import { UpdateCompanyDto } from '../../modules/company/dto/update-company.dto'
import { GetAllCompaniesUseCase } from '../../modules/company/use-cases/get-all-companies/get-all-companies.use-case'
import { GetCompanyByIdUseCase } from '../../modules/company/use-cases/get-company-by-id/get-company-by-id.use-case'
import { UpdateCompanyUseCase } from '../../modules/company/use-cases/update-company/update-company.use-case'
import { DeleteCompanyUseCase } from '../../modules/company/use-cases/delete-company/delete-company.use-case'
import { CreateCompanyUseCase } from '@modules/company/use-cases/create-company/create-company.use-case'

@ApiTags('companies')
@Controller('companies')
export class CompanyController {
  constructor(
    private readonly createCompanyUseCase: CreateCompanyUseCase,
    private readonly getAllCompaniesUseCase: GetAllCompaniesUseCase,
    private readonly getCompanyByIdUseCase: GetCompanyByIdUseCase,
    private readonly updateCompanyUseCase: UpdateCompanyUseCase,
    private readonly deleteCompanyUseCase: DeleteCompanyUseCase
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new company' })
  @ApiResponse({ status: 201, description: 'Company created successfully.' })
  @ApiResponse({ status: 400, description: 'Invalid input data.' })
  @ApiResponse({
    status: 409,
    description: 'A company with this email already exists.'
  })
  create(@Body() createCompanyDto: CreateCompanyDto) {
    return this.createCompanyUseCase.execute(createCompanyDto)
  }

  @Get()
  @ApiOperation({ summary: 'Get all companies' })
  @ApiResponse({ status: 200, description: 'Return all companies.' })
  findAll() {
    return this.getAllCompaniesUseCase.execute()
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a company by id' })
  @ApiParam({ name: 'id', description: 'Company ID', type: 'string' })
  @ApiResponse({ status: 200, description: 'Return the company.' })
  @ApiResponse({ status: 404, description: 'Company not found.' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.getCompanyByIdUseCase.execute(id)
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a company' })
  @ApiParam({ name: 'id', description: 'Company ID', type: 'string' })
  @ApiResponse({ status: 200, description: 'Company updated successfully.' })
  @ApiResponse({ status: 400, description: 'Invalid input data.' })
  @ApiResponse({ status: 404, description: 'Company not found.' })
  @ApiResponse({
    status: 409,
    description: 'A company with this email already exists.'
  })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateCompanyDto: UpdateCompanyDto
  ) {
    return this.updateCompanyUseCase.execute(id, updateCompanyDto)
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a company' })
  @ApiParam({ name: 'id', description: 'Company ID', type: 'string' })
  @ApiResponse({ status: 204, description: 'Company deleted successfully.' })
  @ApiResponse({ status: 404, description: 'Company not found.' })
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    await this.deleteCompanyUseCase.execute(id)
  }
}
