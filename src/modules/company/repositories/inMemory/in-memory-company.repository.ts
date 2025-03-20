import { CompanyRepository } from '../company-repository.interface'
import { Company } from '../../entities/company.entity'

export class InMemoryCompanyRepository implements CompanyRepository {
  private companies: Company[] = []

  async create(createCompany: Company): Promise<void> {
    const company = new Company({
      ...createCompany,
      deletedAt: null
    })

    this.companies.push(company)
    return Promise.resolve()
  }

  async findAll(): Promise<Company[]> {
    return Promise.resolve(
      this.companies.filter((company) => !company.deletedAt)
    )
  }

  async findOne(id: string): Promise<Company | null> {
    const company = this.companies.find((c) => c.id === id && !c.deletedAt)
    if (!company) return null
    return Promise.resolve(company)
  }

  async update(id: string, updateCompany: Company): Promise<void> {
    const index = this.companies.findIndex((c) => c.id === id && !c.deletedAt)
    if (index === -1) return Promise.resolve()

    const updatedCompany = {
      ...this.companies[index],
      ...updateCompany,
      updatedAt: new Date()
    }

    this.companies[index] = updatedCompany
    return Promise.resolve()
  }

  async remove(id: string): Promise<boolean> {
    const index = this.companies.findIndex((c) => c.id === id && !c.deletedAt)
    if (index === -1) return false

    this.companies[index].deletedAt = new Date()
    return Promise.resolve(true)
  }

  async findByEmail(email: string): Promise<Company | null> {
    const company = this.companies.find(
      (c) => c.email === email && !c.deletedAt
    )
    if (!company) return null
    return Promise.resolve(company)
  }
}
