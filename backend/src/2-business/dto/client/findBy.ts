import { IWhere } from "@business/repositories/where";
import { IClientEntity, IClientEntityKeys } from "@domain/entities/client";
import { IUseCaseOptions } from "../useCaseOptions";
import { Either } from "@shared/either";
import { IError } from "@shared/IError";
 
export interface IInputFindClientByDto extends 
  IWhere<keyof IClientEntityKeys, string | number>, 
  IUseCaseOptions<keyof IClientEntityKeys, string | number> {}

export type IOutputFindClientByDto = Either<IError, IClientEntity>