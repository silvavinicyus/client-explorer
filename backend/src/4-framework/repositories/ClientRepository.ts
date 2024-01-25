import { IInputDeleteClientDto } from "@business/dto/client/delete";
import { IInputFindAllClientsDto } from "@business/dto/client/findAll";
import { IInputFindClientByDto } from "@business/dto/client/findBy";
import { IPaginatedResponse } from "@business/dto/useCaseOptions";
import { IClientRepository, IInputUpdateClient } from "@business/repositories/client/iClientRepository";
import { IClientEntity } from "@domain/entities/client";
import { db } from "@framework/utils/database";
import { ClientMapper } from "@framework/utils/mapper";
import { injectable } from "inversify";
import { Pool, QueryResult } from "pg";

interface IQueryExecutor {
  query: string
  parameters: any[]
}
@injectable()
export class ClientRepository implements IClientRepository {    

  db: Pool;

  constructor(){
    this.db = db
  }

  async create(input: IClientEntity): Promise<IClientEntity> {    
    const query = 'INSERT INTO clients(uuid, name, email, phone, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id'    
    
    const parameters = [input.uuid, input.name, input.email, input.phone, input.created_at, input.updated_at]        

    const result = await this.queryExecutor({query, parameters})
    
    return {
      ...input,
      id: result.rows[0]['id'],
    };
  }

  async findBy(input: IInputFindClientByDto): Promise<IClientEntity> {
    const query = `SELECT * FROM clients WHERE ${input.column} = $1`

    const parameters = [input.value]

    const result = await this.queryExecutor({query, parameters})

    if (result.rowCount <= 0) {
      return void 0
    }

    const client = ClientMapper.toEntity(result.rows[0])

    return client
  }

  async findAll(input: IInputFindAllClientsDto): Promise<IPaginatedResponse<IClientEntity>> {    
    const offset = (input.pagination.page) * input.pagination.count;
    const { where, parameters } = this.containsWhereBuilder(input.filters.contains)

    const query = `SELECT * FROM clients ${where} ORDER BY created_at LIMIT $${parameters.length+1} OFFSET $${parameters.length+2}`

    const queryParameters = [...parameters, input.pagination.count, offset]

    const result = await this.queryExecutor({query, parameters: queryParameters})      

    const clients = ClientMapper.toEntityArray(result.rows)

    return {
      count: clients.length,
      items: clients,
      page: input.pagination.page,
      perPage: input.pagination.count,
    }
  }
  
  async update(input: IInputUpdateClient): Promise<Partial<IClientEntity>> {

    const { set, parameters } = this.getSetClauseBuilder(input)    

    const query = `UPDATE clients SET ${set} WHERE ${input.updateWhere.column} = $${parameters.length+1} RETURNING *`

    const queryParameters = [...parameters, input.updateWhere.value]
    
    const result = await this.queryExecutor({query, parameters: queryParameters})

    const client = ClientMapper.toEntity(result.rows[0])

    return client
  }

  async delete(input: IInputDeleteClientDto): Promise<void> {
    const query = `DELETE FROM clients WHERE id = $1`

    const parameters = [input.id]

    await this.queryExecutor({query, parameters})    
    return void 0
  }

  async queryExecutor({query, parameters}: IQueryExecutor): Promise<QueryResult<any>> {    
    await db.connect()    
    const result = await this.db.query(query, parameters)        
    return result
  }

  containsWhereBuilder(data: any): {where: string, parameters: any[]} {
    let where = ''
    let parameters = []

    const contains = data

    const filteredContains = contains.filter((contain) => contain.value)

    parameters = filteredContains.map((contain) => `%${contain.value}%`)

    where = filteredContains.reduce((acc, field, index) => {
      return index <= 0 ? `WHERE ${field.column} LIKE $${index+1}` : acc +  ` AND ${field.column} LIKE $${index+1}`
    }, '')
    
    
    return {where, parameters}
  }

  getSetClauseBuilder(input: IInputUpdateClient): {set: string, parameters: any[]} {
    const inputKeys = Object.keys(input.newData)

    const filteredKeys = inputKeys.filter((key) => input.newData[key] && key !== 'uuid')

    const setClause = filteredKeys.reduce((acc, element, index) => {
      if (index === filteredKeys.length-1) {
        return acc + `${element} = $${index+1}`
      }
      return acc + `${element} = $${index+1}, `
    }, '')

    const parameters = []

    filteredKeys.forEach((key) => {
      parameters.push(input.newData[key])
    })    
    
    return {set: setClause, parameters}
  } 
}
