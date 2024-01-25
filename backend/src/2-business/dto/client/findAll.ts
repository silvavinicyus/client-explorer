import { IClientEntity } from "@domain/entities/client";
import { IError } from "@shared/IError";
import { Either } from "@shared/either";
import { IPaginatedResponse, IUseCaseOptions } from "../useCaseOptions";

export type IInputFindAllClientsDto = IUseCaseOptions<
  keyof Pick<
    IClientEntity, 
      'name' 
      | 'email' 
      | 'phone' 
      | 'id' 
      | 'uuid'
    >, 
  string | number
>

export type IOutputFindAllClientsDto = Either<
  IError, 
  IPaginatedResponse<IClientEntity>
>