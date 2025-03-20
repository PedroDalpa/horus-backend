import { Test } from '@nestjs/testing'
import { GetAllCompaniesUseCase } from './get-all-companies.use-case'
import { COMPANY_REPOSITORY } from '../../repositories/company-repository.interface'
import { InMemoryCompanyRepository } from '../../repositories/inMemory/in-memory-company.repository'
import { Company } from '../../entities/company.entity'

describe('GetAllCompaniesUseCase', () => {
  let getAllCompaniesUseCase: GetAllCompaniesUseCase
  let companyRepository: InMemoryCompanyRepository

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        GetAllCompaniesUseCase,
        {
          provide: COMPANY_REPOSITORY,
          useClass: InMemoryCompanyRepository
        }
      ]
    }).compile()

    getAllCompaniesUseCase = moduleRef.get<GetAllCompaniesUseCase>(
      GetAllCompaniesUseCase
    )
    companyRepository =
      moduleRef.get<InMemoryCompanyRepository>(COMPANY_REPOSITORY)
  })

  it('should be defined', () => {
    expect(getAllCompaniesUseCase).toBeDefined()
  })

  it('should be able return an empty array when no companies exist', async () => {
    const spyFindAll = jest.spyOn(companyRepository, 'findAll')
    const companies = await getAllCompaniesUseCase.execute()

    expect(spyFindAll).toHaveBeenCalled()
    expect(companies).toEqual([])
  })

  it('should be able return all companies', async () => {
    const company1 = new Company({
      name: 'Company 1',
      address: '123 Street',
      phone: '1234567890',
      email: 'company1@test.com'
    })

    const company2 = new Company({
      name: 'Company 2',
      address: '456 Street',
      phone: '9876543210',
      email: 'company2@test.com'
    })

    await companyRepository.create(company1)
    await companyRepository.create(company2)

    const spyFindAll = jest.spyOn(companyRepository, 'findAll')
    const companies = await getAllCompaniesUseCase.execute()

    expect(spyFindAll).toHaveBeenCalled()
    expect(companies).toHaveLength(2)
    expect(companies).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: company1.id,
          name: 'Company 1',
          email: 'company1@test.com'
        }),
        expect.objectContaining({
          id: company2.id,
          name: 'Company 2',
          email: 'company2@test.com'
        })
      ])
    )
  })
})
