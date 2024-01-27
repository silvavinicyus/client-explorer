export interface IClient {
  id: number
  uuid: string
  name: string
  email: string
  phone: string
  address: string
  created_at: Date
  updated_at: Date
}

export interface IFindAllClientsResponse {
  page: number
  perPage: number
  items: IClient[]
  count: number
}

export interface ICreateClientBody {
  name: string
  phone: string
  email: string
  address: string
}

export interface IUpdateClientBody {
  uuid: string
  body: Partial<Pick<IClient, 'name' | 'email' | 'phone' | 'address'>>
}