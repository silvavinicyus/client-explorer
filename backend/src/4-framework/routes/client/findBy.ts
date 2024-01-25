import '@framework/ioc/inversify.config'
import { FindByClientOperator } from '@controller/operations/client/findByClientOperator'
import { InputFindByClient } from '@controller/serializers/client/inputFindBy'
import { IError } from '@shared/IError'
import { container } from '@shared/ioc/container'
import {Request, Response} from 'express'


export class FindByClientHandler {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const operator = container.get(FindByClientOperator)

      const input = new InputFindByClient({
        uuid: request.params.uuid
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
  
      return response.status(500).json({error: 'An internal server error occurred in client search'})      
    }
  }
}