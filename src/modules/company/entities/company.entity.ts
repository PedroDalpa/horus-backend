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
    data: Omit<
      Company,
      'id' | 'createdAt' | 'updatedAt' | 'providesServiceDirectly'
    >,
    id?: string
  ) {
    Object.assign(this, {
      id: id ?? crypto.randomUUID(),
      ...data,
      providesServiceDirectly: id ? this.providesServiceDirectly : true,
      createdAt: id ? this.createdAt : new Date(),
      updatedAt: new Date()
    })
  }
}
