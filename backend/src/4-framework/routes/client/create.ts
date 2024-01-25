import '@framework/ioc/inversify.config'
import { CreateClientOperator } from '@controller/operations/client/createClientOperator'
import { InputCreateClient } from '@controller/serializers/client/inputCreate'
import { IError } from '@shared/IError'
import { container } from '@shared/ioc/container'
import {Request, Response} from 'express'

export class CreateClientHandler {
  async handle(request: Request, response: Response): Promise<Response> {    
    try {
      const operator = container.get(CreateClientOperator)

      const input = new InputCreateClient({
        email: request.body.email,
        name: request.body.name,
        phone: request.body.phone
      })

      const client = await operator.run(input)

      if (client.isLeft()) {
        throw client.value
      }      

      return response.status(201).json(client.value)
    } catch(err) {
      if (err instanceof IError) {
        return response.status(err.statusCode).json(err.body)
      }        
  
      console.error(err)
  
      return response.status(500).json({error: 'An internal server error occurred in client creation'})      
    }
  }
}