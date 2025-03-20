import { Company } from '../entities/company.entity'

export interface CompanyRepository {
  create(company: Company): Promise<void>
  findAll(): Promise<Company[]>
  findOne(id: string): Promise<Company | null>
  update(id: string, updateCompany: Company): Promise<void>
  remove(id: string): Promise<boolean>
  findByEmail(email: string): Promise<Company | null>
}

export const COMPANY_REPOSITORY = 'COMPANY_REPOSITORY'
