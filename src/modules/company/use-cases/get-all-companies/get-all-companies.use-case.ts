import { Injectable, Inject } from '@nestjs/common'
import {
  CompanyRepository,
  COMPANY_REPOSITORY
} from '../../repositories/company-repository.interface'
import { Company } from '../../entities/company.entity'

@Injectable()
export class GetAllCompaniesUseCase {
  constructor(
    @Inject(COMPANY_REPOSITORY)
    private readonly companyRepository: CompanyRepository
  ) {}

  async execute(): Promise<Company[]> {
    return this.companyRepository.findAll()
  }
}
