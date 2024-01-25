import { IClientEntity, IClientEntityKeys } from "@domain/entities/client";
import { IPaginatedResponse, IUseCaseOptions } from "../useCaseOptions";
import { Either } from "@shared/either";
import { IError } from "@shared/IError";

export type IInputFindAllClientsDto = IUseCaseOptions<keyof IClientEntityKeys, string | number>
export type IOutputFindAllClientsDto = Either<IError, IPaginatedResponse<IClientEntity>>