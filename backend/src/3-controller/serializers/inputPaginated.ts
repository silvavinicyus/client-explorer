import { IOrdenationColumn } from '@shared/utils/types/order'

export interface IInputPaginatedProps<C> {
  paginate?: boolean
  count: number
  page: number
  contains: C
  getDeactivated: boolean
  getDeleted: boolean
  getShutdown: boolean
  getFollowUp: boolean
  orders?: IOrdenationColumn[]
}
