import '@framework/ioc/inversify.config'
import { IError } from '@shared/IError'
import { container } from '@shared/ioc/container'
import {Request, Response} from 'express'
import { UpdateClientOperator } from '@controller/operations/client/updateClientOperator'
import { InputUpdateClient } from '@controller/serializers/client/inputUpdate'

export class UpdateClientHandler {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const operator = container.get(UpdateClientOperator)

      const input = new InputUpdateClient({
        uuid: request.params.uuid,
        email: request.body.email,
        name: request.body.name,
        phone: request.body.phone,
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
  
      return response.status(500).json({error: 'An internal server error occurred in client update'})      
    }
  }
}