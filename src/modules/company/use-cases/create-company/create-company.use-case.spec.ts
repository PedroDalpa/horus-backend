import { Test } from '@nestjs/testing'
import { ConflictException } from '@nestjs/common'
import { CreateCompanyUseCase } from './create-company.use-case'
import { COMPANY_REPOSITORY } from '../../repositories/company-repository.interface'
import { InMemoryCompanyRepository } from '../../repositories/inMemory/in-memory-company.repository'
import { CreateCompanyDto } from '../../dto/create-company.dto'

describe('CreateCompanyUseCase', () => {
  let createCompanyUseCase: CreateCompanyUseCase
  let companyRepository: InMemoryCompanyRepository

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        CreateCompanyUseCase,
        {
          provide: COMPANY_REPOSITORY,
          useClass: InMemoryCompanyRepository
        }
      ]
    }).compile()

    createCompanyUseCase =
      moduleRef.get<CreateCompanyUseCase>(CreateCompanyUseCase)
    companyRepository =
      moduleRef.get<InMemoryCompanyRepository>(COMPANY_REPOSITORY)
  })

  it('should be defined', () => {
    expect(createCompanyUseCase).toBeDefined()
  })

  it('should be able create a company', async () => {
    const companyDto: CreateCompanyDto = {
      name: 'Test Company',
      address: '123 Test Street',
      phone: '1234567890',
      email: 'test@company.com'
    }

    const spyCreate = jest.spyOn(companyRepository, 'create')
    const company = await createCompanyUseCase.execute(companyDto)

    expect(spyCreate).toHaveBeenCalledWith(company)
    expect(company).toEqual(
      expect.objectContaining({
        name: 'Test Company',
        address: '123 Test Street',
        phone: '1234567890',
        email: 'test@company.com',
        providesServiceDirectly: true,
        id: expect.any(String) as string,
        createdAt: expect.any(Date) as Date,
        updatedAt: expect.any(Date) as Date
      })
    )
  })

  it('should throw a ConflictException if company with same email already exists', async () => {
    const companyDto: CreateCompanyDto = {
      name: 'Test Company',
      address: '123 Test Street',
      phone: '1234567890',
      email: 'test@company.com'
    }

    await createCompanyUseCase.execute(companyDto)

    await expect(createCompanyUseCase.execute(companyDto)).rejects.toThrow(
      ConflictException
    )
  })
})
