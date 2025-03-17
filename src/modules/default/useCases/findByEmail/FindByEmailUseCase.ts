import { IReaderRepository } from '../../repositories/IReaderRepository'
import { Inject, Injectable } from '@nestjs/common'
import { FindByEmailDTO } from '../../dtos/FindByEmailDTO'

@Injectable()
class FindByEmailUseCase {
  constructor(
    @Inject('IReaderRepository')
    private readerRepository: IReaderRepository
  ) {}
  async execute(email: string): Promise<FindByEmailDTO> {
    const reader = await this.readerRepository.findByEmail(email)

    if (!reader) {
      throw new Error('User not found')
    }

    return {
      email: reader.email,
      maxSequence: reader.maxSequence,
      sequence: reader.sequence,
      totalRead: reader.totalRead
    }
  }
}

export { FindByEmailUseCase }
