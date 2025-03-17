import { ReaderModel } from '@modules/default/model/ReaderModel'
import { InMemoryReaderRepository } from '@modules/default/repositories/inMemory/InMemoryReaderRepository'

type ReaderFactory = {
  email?: string
  maxSequence?: number
  sequence?: number
  totalRead?: number
  lastEditionOpened?: string
  inMemoryReaderRepository: InMemoryReaderRepository
}

function createReaderModelFactory({
  email = 'teste@email.com',
  lastEditionOpened = '2025-02-18',
  maxSequence = 4,
  totalRead = 10,
  sequence = 1,
  inMemoryReaderRepository
}: ReaderFactory) {
  const reader = new ReaderModel({
    email,
    lastEditionOpened,
    maxSequence,
    sequence,
    totalRead
  })

  inMemoryReaderRepository.readers.push(reader)
  return reader
}

export { createReaderModelFactory }
