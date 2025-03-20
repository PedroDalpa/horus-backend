export class Company {
  id: string
  name: string
  address: string
  phone: string
  email: string
  providesServiceDirectly: boolean
  deletedAt?: Date | null
  createdAt: Date
  updatedAt: Date

  constructor(
    data: Omit<Company, 'id' | 'createdAt' | 'updatedAt'>,
    id?: string
  ) {
    Object.assign(this, {
      id: id ?? crypto.randomUUID(),
      ...data,
      createdAt: id ?? new Date(),
      updatedAt: new Date()
    })
  }
}
