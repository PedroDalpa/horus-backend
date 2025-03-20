import { Test } from '@nestjs/testing'
import { NotFoundException } from '@nestjs/common'
import { GetCompanyByIdUseCase } from './get-company-by-id.use-case'
import { COMPANY_REPOSITORY } from '../../repositories/company-repository.interface'
import { InMemoryCompanyRepository } from '../../repositories/inMemory/in-memory-company.repository'
import { Company } from '../../entities/company.entity'

describe('GetCompanyByIdUseCase', () => {
  let getCompanyByIdUseCase: GetCompanyByIdUseCase
  let companyRepository: InMemoryCompanyRepository

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        GetCompanyByIdUseCase,
        {
          provide: COMPANY_REPOSITORY,
          useClass: InMemoryCompanyRepository
        }
      ]
    }).compile()

    getCompanyByIdUseCase = moduleRef.get<GetCompanyByIdUseCase>(
      GetCompanyByIdUseCase
    )
    companyRepository =
      moduleRef.get<InMemoryCompanyRepository>(COMPANY_REPOSITORY)
  })

  it('should be defined', () => {
    expect(getCompanyByIdUseCase).toBeDefined()
  })

  it('should return a company by id', async () => {
    const company = new Company({
      name: 'Test Company',
      address: '123 Test Street',
      phone: '1234567890',
      email: 'test@company.com'
    })

    await companyRepository.create(company)

    const spyFindOne = jest.spyOn(companyRepository, 'findOne')
    const foundCompany = await getCompanyByIdUseCase.execute(company.id)

    expect(spyFindOne).toHaveBeenCalledWith(company.id)
    expect(foundCompany).toEqual(
      expect.objectContaining({
        id: company.id,
        name: 'Test Company',
        address: '123 Test Street',
        phone: '1234567890',
        email: 'test@company.com',
        providesServiceDirectly: true
      })
    )
  })

  it('should throw a NotFoundException if company does not exist', async () => {
    await expect(
      getCompanyByIdUseCase.execute('non-existent-id')
    ).rejects.toThrow(NotFoundException)
  })
})
