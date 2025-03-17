import { ReaderModel } from '../model/ReaderModel'

interface IReaderRepository {
  findByEmail(email: string): Promise<ReaderModel | null>
  save(props: ReaderModel): Promise<void>
}

export { IReaderRepository }
