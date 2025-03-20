import { Injectable } from '@nestjs/common'
import { PrismaService } from '../../../infra/config/prisma.service'
import { CompanyRepository } from './company-repository.interface'
import { Company } from '../entities/company.entity'

@Injectable()
export class PrismaCompanyRepository implements CompanyRepository {
  constructor(private prisma: PrismaService) {}

  async create(createCompany: Company): Promise<void> {
    await this.prisma.company.create({
      data: createCompany
    })
  }

  async findAll(): Promise<Company[]> {
    const companies = await this.prisma.company.findMany({
      where: { deletedAt: null }
    })

    return companies.map((company) => new Company(company))
  }

  async findOne(id: string): Promise<Company | null> {
    const company = await this.prisma.company.findUnique({
      where: { id, deletedAt: null }
    })

    if (!company) return null
    return new Company(company)
  }

  async update(id: string, updateCompany: Company): Promise<void> {
    try {
      await this.prisma.company.update({
        where: { id, deletedAt: null },
        // This is considered a good practice as it guarantees that only the
        // intended fields are updated, preventing unintended changes.
        data: {
          address: updateCompany.address,
          name: updateCompany.name,
          phone: updateCompany.phone,
          email: updateCompany.email
        }
      })
    } catch (error) {
      console.error(error)
    }
  }

  async remove(id: string): Promise<boolean> {
    try {
      await this.prisma.company.update({
        where: { id, deletedAt: null },
        data: { deletedAt: new Date() }
      })

      return true
    } catch (error) {
      console.error(error)
      return false
    }
  }

  async findByEmail(email: string): Promise<Company | null> {
    const company = await this.prisma.company.findFirst({
      where: { email, deletedAt: null }
    })

    if (!company) return null
    return new Company(company)
  }
}
