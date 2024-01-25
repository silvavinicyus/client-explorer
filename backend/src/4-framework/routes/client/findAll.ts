import '@framework/ioc/inversify.config'
import { FindAllClientsOperator } from '@controller/operations/client/findAllClientsOperator'
import { InputFindAllClients } from '@controller/serializers/client/inputFindAll'
import { IError } from '@shared/IError'
import { container } from '@shared/ioc/container'
import {Request, Response} from 'express'

export class FindAllClientsHandler {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const operator = container.get(FindAllClientsOperator)

      const input = new InputFindAllClients({
        page: +request.query.page || 0,
        count: +request.query.count || 10,
        contains: [
          {
            column: 'email',
            value: request.query.email ? String(request.query.email) : undefined
          },
          {
            column: 'phone',
            value: request.query.phone ? String(request.query.phone) : undefined
          },{
            column: 'name',
            value: request.query.name ? String(request.query.name) : undefined
          }
        ]
      })

      const client = await operator.run(input)

      if (client.isLeft()) {
        throw client.value
      }      

      return response.status(200).json(client.value)
    } catch(err) {
      if (err instanceof IError) {
        return response.status(err.statusCode).json(err.body)
      }        
  
      console.error(err)
  
      return response.status(500).json({error: 'An internal server error occurred in clients search'})      
    }
  }
}