import { IClientEntity } from "@domain/entities/client";
import { IError } from "@shared/IError";
import { Either } from "@shared/either";

export type IInputUpdateClientDto = Partial<
  Pick<IClientEntity, 
    'email' 
    | 'name'
    | 'phone'>
  >

export type IOutputUpdateClientDto = Either<IError, Partial<IClientEntity>>