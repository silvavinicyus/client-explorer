export interface IInputPaginatedProps<C> {
  paginate?: boolean
  count: number
  page: number
  contains: C
}
