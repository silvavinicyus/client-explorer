import '@framework/ioc/inversify.config'
import { GetBestPathOperator } from "@controller/operations/client/getBestpathOperator"
import { container } from "@shared/ioc/container"
import {Request, Response} from 'express'
import { IError } from '@shared/IError'
export class GetBestPathHandler {
  async handle(_request: Request, response: Response): Promise<Response> { 
    try {
      const operator = container.get(GetBestPathOperator)
      
      const bestPath = await operator.run()

      if (bestPath.isLeft()) {
        throw bestPath.value
      }      

      return response.status(200).json(bestPath.value)
    } catch(err) {
      if (err instanceof IError) {
        return response.status(err.statusCode).json(err.body)
      }        
  
      console.error(err)  
      return response.status(500).json({error: 'An internal server error occurred while calcutaing the best path throw clients adresses'})      
    }
  }
}