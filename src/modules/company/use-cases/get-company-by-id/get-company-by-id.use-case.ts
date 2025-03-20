import { Injectable, Inject, NotFoundException } from '@nestjs/common'
import {
  CompanyRepository,
  COMPANY_REPOSITORY
} from '../../repositories/company-repository.interface'
import { Company } from '../../entities/company.entity'

@Injectable()
export class GetCompanyByIdUseCase {
  constructor(
    @Inject(COMPANY_REPOSITORY)
    private readonly companyRepository: CompanyRepository
  ) {}

  async execute(id: string): Promise<Company> {
    const company = await this.companyRepository.findOne(id)

    if (!company) {
      throw new NotFoundException(`Company with id ${id} not found`)
    }

    return company
  }
}
