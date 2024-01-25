import { IError } from "@shared/IError"
import { Either } from "@shared/either"

export type IInputDeleteClientDto = {
  id: number
}

export type IOutputDeleteClientDto = Either<IError, void>