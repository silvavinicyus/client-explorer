import { IClientEntity, IInputClientEntity } from "@domain/entities/client";
import { IError } from "@shared/IError";
import { Either } from "@shared/either";

export type IInputCreateClientDto = IInputClientEntity

export type IOutputCreateClientDto = Either<IError, IClientEntity>