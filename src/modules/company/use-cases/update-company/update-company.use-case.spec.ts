import { Test } from '@nestjs/testing'
import { ConflictException, NotFoundException } from '@nestjs/common'
import { UpdateCompanyUseCase } from './update-company.use-case'
import { COMPANY_REPOSITORY } from '../../repositories/company-repository.interface'
import { InMemoryCompanyRepository } from '../../repositories/inMemory/in-memory-company.repository'
import { UpdateCompanyDto } from '../../dto/update-company.dto'
import { Company } from '../../entities/company.entity'

describe('UpdateCompanyUseCase', () => {
  let updateCompanyUseCase: UpdateCompanyUseCase
  let companyRepository: InMemoryCompanyRepository

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        UpdateCompanyUseCase,
        {
          provide: COMPANY_REPOSITORY,
          useClass: InMemoryCompanyRepository
        }
      ]
    }).compile()

    updateCompanyUseCase =
      moduleRef.get<UpdateCompanyUseCase>(UpdateCompanyUseCase)
    companyRepository =
      moduleRef.get<InMemoryCompanyRepository>(COMPANY_REPOSITORY)
  })

  it('should be defined', () => {
    expect(updateCompanyUseCase).toBeDefined()
  })

  it('should update a company', async () => {
    const company = new Company({
      name: 'Original Company',
      address: '123 Original Street',
      phone: '1234567890',
      email: 'original@company.com'
    })

    await companyRepository.create(company)

    const updateCompanyDto: UpdateCompanyDto = {
      name: 'Updated Company',
      address: '456 Updated Street',
      phone: '0987654321',
      email: 'updated@company.com'
    }

    const spyUpdate = jest.spyOn(companyRepository, 'update')
    const updatedCompany = await updateCompanyUseCase.execute(
      company.id,
      updateCompanyDto
    )

    expect(spyUpdate).toHaveBeenCalledWith(company.id, updatedCompany)
    expect(updatedCompany).toEqual(
      expect.objectContaining({
        id: company.id,
        name: 'Updated Company',
        address: '456 Updated Street',
        phone: '0987654321',
        email: 'updated@company.com',
        providesServiceDirectly: true
      })
    )
  })

  it('should throw a NotFoundException if company does not exist', async () => {
    const updateCompanyDto: UpdateCompanyDto = {
      name: 'Updated Company'
    }

    await expect(
      updateCompanyUseCase.execute('non-existent-id', updateCompanyDto)
    ).rejects.toThrow(NotFoundException)
  })

  it('should throw a ConflictException if email already exists on another company', async () => {
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

    const updateCompanyDto: UpdateCompanyDto = {
      email: 'company2@test.com'
    }

    await expect(
      updateCompanyUseCase.execute(company1.id, updateCompanyDto)
    ).rejects.toThrow(ConflictException)
  })

  it('should partially update a company (only the specified fields)', async () => {
    const company = new Company({
      name: 'Original Company',
      address: '123 Original Street',
      phone: '1234567890',
      email: 'original@company.com'
    })

    await companyRepository.create(company)

    const updateCompanyDto: UpdateCompanyDto = {
      name: 'Partially Updated Company'
    }

    const updatedCompany = await updateCompanyUseCase.execute(
      company.id,
      updateCompanyDto
    )

    expect(updatedCompany).toEqual(
      expect.objectContaining({
        id: company.id,
        name: 'Partially Updated Company',
        address: '123 Original Street',
        phone: '1234567890',
        email: 'original@company.com',
        providesServiceDirectly: true
      })
    )
  })
})
