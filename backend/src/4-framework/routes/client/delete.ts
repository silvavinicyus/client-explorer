import '@framework/ioc/inversify.config'
import { DeleteClientOperator } from '@controller/operations/client/deleteClientOperator'
import { InputDeleteClient } from '@controller/serializers/client/inputDelete'
import { IError } from '@shared/IError'
import { container } from '@shared/ioc/container'
import {Request, Response} from 'express'

export class DeleteClientHandler {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const operator = container.get(DeleteClientOperator)

      const input = new InputDeleteClient({
        uuid: request.params.uuid
      })

      const client = await operator.run(input)

      if (client.isLeft()) {
        throw client.value
      }      
            
      return response.status(204).json()
    } catch(err) {
      if (err instanceof IError) {
        return response.status(err.statusCode).json(err.body)
      }        
  
      console.error(err)
  
      return response.status(500).json({error: 'An internal server error occurred in client deletion'})      
    }
  }
}