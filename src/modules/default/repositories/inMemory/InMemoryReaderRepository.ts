import { ReaderModel } from '../../model/ReaderModel'
import { IReaderRepository } from '../IReaderRepository'

class InMemoryReaderRepository implements IReaderRepository {
  public readers: ReaderModel[] = []

  async findByEmail(email: string): Promise<ReaderModel | null> {
    const reader = this.readers.find((reader) => reader.email === email) ?? null

    return Promise.resolve(reader)
  }

  save(props: ReaderModel): Promise<void> {
    const index = this.readers.findIndex((reader) => reader.id === props.id)

    if (index < 0) {
      this.readers.push(props)
      return Promise.resolve()
    }

    this.readers[index] = props
    return Promise.resolve()
  }
}

export { InMemoryReaderRepository }
