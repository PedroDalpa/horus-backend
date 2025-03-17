import { Module } from '@nestjs/common'
import { DefaultController } from '@infra/controllers/default/default.controller'
import { FindByEmailUseCase } from './useCases/findByEmail/FindByEmailUseCase'
import { InMemoryReaderRepository } from './repositories/inMemory/InMemoryReaderRepository'

@Module({
  controllers: [DefaultController],
  providers: [
    FindByEmailUseCase,
    {
      provide: 'ReaderRepository',
      useClass: InMemoryReaderRepository
    }
  ]
})
export class Default {}
