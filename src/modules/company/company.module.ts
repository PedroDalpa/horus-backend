import { Module } from '@nestjs/common'
import { CompanyController } from '../../infra/controllers/company.controller'
import { PrismaModule } from '../../infra/shared/prisma/prisma.module'
import { COMPANY_REPOSITORY } from './repositories/company-repository.interface'
import { PrismaCompanyRepository } from './repositories/prisma-company.repository'
import { GetAllCompaniesUseCase } from './use-cases/get-all-companies/get-all-companies.use-case'
import { GetCompanyByIdUseCase } from './use-cases/get-company-by-id/get-company-by-id.use-case'
import { UpdateCompanyUseCase } from './use-cases/update-company/update-company.use-case'
import { DeleteCompanyUseCase } from './use-cases/delete-company/delete-company.use-case'
import { CreateCompanyUseCase } from './use-cases/create-company/create-company.use-case'

@Module({
  imports: [PrismaModule],
  controllers: [CompanyController],
  providers: [
    {
      provide: COMPANY_REPOSITORY,
      useClass: PrismaCompanyRepository
    },
    CreateCompanyUseCase,
    GetAllCompaniesUseCase,
    GetCompanyByIdUseCase,
    UpdateCompanyUseCase,
    DeleteCompanyUseCase
  ],
  exports: [COMPANY_REPOSITORY]
})
export class CompanyModule {}
