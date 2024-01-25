import { IError } from "@shared/IError"
import { Either } from "@shared/either"

export type IInputDeleteClientDto = {
  uuid: string
}

export type IOutputDeleteClientDto = Either<IError, void>