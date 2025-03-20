import { Test } from '@nestjs/testing'
import { NotFoundException } from '@nestjs/common'
import { DeleteCompanyUseCase } from './delete-company.use-case'
import { COMPANY_REPOSITORY } from '../../repositories/company-repository.interface'
import { InMemoryCompanyRepository } from '../../repositories/inMemory/in-memory-company.repository'
import { Company } from '../../entities/company.entity'

describe('DeleteCompanyUseCase', () => {
  let deleteCompanyUseCase: DeleteCompanyUseCase
  let companyRepository: InMemoryCompanyRepository

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        DeleteCompanyUseCase,
        {
          provide: COMPANY_REPOSITORY,
          useClass: InMemoryCompanyRepository
        }
      ]
    }).compile()

    deleteCompanyUseCase =
      moduleRef.get<DeleteCompanyUseCase>(DeleteCompanyUseCase)
    companyRepository =
      moduleRef.get<InMemoryCompanyRepository>(COMPANY_REPOSITORY)
  })

  it('should be defined', () => {
    expect(deleteCompanyUseCase).toBeDefined()
  })

  it('should delete a company', async () => {
    const company = new Company({
      name: 'Test Company',
      address: '123 Test Street',
      phone: '1234567890',
      email: 'test@company.com'
    })

    await companyRepository.create(company)

    const spyFindOne = jest.spyOn(companyRepository, 'findOne')
    const spyRemove = jest.spyOn(companyRepository, 'remove')

    await deleteCompanyUseCase.execute(company.id)

    expect(spyFindOne).toHaveBeenCalledWith(company.id)
    expect(spyRemove).toHaveBeenCalledWith(company.id)

    await expect(companyRepository.findOne(company.id)).resolves.toBeNull()
  })

  it('should throw a NotFoundException if company does not exist', async () => {
    await expect(
      deleteCompanyUseCase.execute('non-existent-id')
    ).rejects.toThrow(NotFoundException)
  })
})
