import { IsArray, IsInt, IsOptional } from 'class-validator'
import { AbstractSerializer } from '../abstractSerializer'
import { IInputPaginatedProps } from '../inputPaginated'
import { IInputFindAllClientsDto } from '@business/dto/client/findAll'

interface IInputFindAllClientsOperator
  extends IInputPaginatedProps<IInputFindAllClientsDto['filters']['contains']> {}

export class InputFindAllClients extends AbstractSerializer<IInputFindAllClientsOperator> {
  @IsOptional()
  @IsInt()
  count: number

  @IsOptional()
  @IsInt()
  page: number

  @IsArray()
  contains: IInputFindAllClientsDto['filters']['contains']  
}
