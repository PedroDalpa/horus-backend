import { Injectable, Inject, NotFoundException } from '@nestjs/common'
import {
  CompanyRepository,
  COMPANY_REPOSITORY
} from '../../repositories/company-repository.interface'

@Injectable()
export class DeleteCompanyUseCase {
  constructor(
    @Inject(COMPANY_REPOSITORY)
    private readonly companyRepository: CompanyRepository
  ) {}

  async execute(id: string): Promise<void> {
    const existingCompany = await this.companyRepository.findOne(id)
    if (!existingCompany) {
      throw new NotFoundException(`Company with id ${id} not found`)
    }

    const success = await this.companyRepository.remove(id)

    if (!success) {
      throw new NotFoundException(`Company with id ${id} not found`)
    }
  }
}
