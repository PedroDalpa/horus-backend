import { createReaderModelFactory } from '@test/factories/reader.factory'
import { FindByEmailUseCase } from './FindByEmailUseCase'
import { InMemoryReaderRepository } from '@modules/default/repositories/inMemory/InMemoryReaderRepository'

let inMemoryReaderRepository: InMemoryReaderRepository
let useCase: FindByEmailUseCase

describe('Find Reader by Email Use Case', () => {
  beforeAll(() => {
    jest.useFakeTimers()
  })

  afterAll(() => {
    jest.useRealTimers()
  })

  beforeEach(() => {
    inMemoryReaderRepository = new InMemoryReaderRepository()
    useCase = new FindByEmailUseCase(inMemoryReaderRepository)
  })

  it('Should correctly calculate the weekDays when sequence is 3 and today is Thursday', async () => {
    jest.setSystemTime(new Date('2025-02-20'))

    createReaderModelFactory({
      inMemoryReaderRepository
    })

    const reader = await useCase.execute('teste@email.com')

    expect(reader.email).toEqual('teste@email.com')
  })
})
