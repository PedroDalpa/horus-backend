import {
  Injectable,
  Inject,
  NotFoundException,
  ConflictException
} from '@nestjs/common'
import {
  CompanyRepository,
  COMPANY_REPOSITORY
} from '../../repositories/company-repository.interface'
import { UpdateCompanyDto } from '../../dto/update-company.dto'
import { Company } from '../../entities/company.entity'

@Injectable()
export class UpdateCompanyUseCase {
  constructor(
    @Inject(COMPANY_REPOSITORY)
    private readonly companyRepository: CompanyRepository
  ) {}

  async execute(
    id: string,
    updateCompanyDto: UpdateCompanyDto
  ): Promise<Company> {
    const existingCompany = await this.companyRepository.findOne(id)
    if (!existingCompany) {
      throw new NotFoundException(`Company with id ${id} not found`)
    }

    if (
      updateCompanyDto.email &&
      updateCompanyDto.email !== existingCompany.email
    ) {
      const companyWithSameEmail = await this.companyRepository.findByEmail(
        updateCompanyDto.email
      )
      if (companyWithSameEmail) {
        throw new ConflictException('A company with this email already exists')
      }
    }

    const updateCompany: Company = {
      ...existingCompany,
      name: updateCompanyDto.name ?? existingCompany.name,
      address: updateCompanyDto.address ?? existingCompany.address,
      phone: updateCompanyDto.phone ?? existingCompany.phone,
      email: updateCompanyDto.email ?? existingCompany.email
    }

    await this.companyRepository.update(id, updateCompany)

    return updateCompany
  }
}
