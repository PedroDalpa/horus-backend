import { Injectable, Inject, ConflictException } from '@nestjs/common'
import {
  CompanyRepository,
  COMPANY_REPOSITORY
} from '../../repositories/company-repository.interface'
import { CreateCompanyDto } from '../../dto/create-company.dto'
import { Company } from '../../entities/company.entity'

@Injectable()
export class CreateCompanyUseCase {
  constructor(
    @Inject(COMPANY_REPOSITORY)
    private readonly companyRepository: CompanyRepository
  ) {}

  async execute(createCompanyDto: CreateCompanyDto): Promise<Company> {
    const existingCompany = await this.companyRepository.findByEmail(
      createCompanyDto.email
    )

    if (existingCompany) {
      throw new ConflictException('A company with this email already exists')
    }

    const company = new Company({
      address: createCompanyDto.address,
      email: createCompanyDto.email,
      name: createCompanyDto.name,
      phone: createCompanyDto.phone
    })

    await this.companyRepository.create(company)

    return company
  }
}
