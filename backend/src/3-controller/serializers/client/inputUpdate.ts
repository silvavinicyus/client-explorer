import { IInputUpdateClientDto } from "@business/dto/client/update";
import { AbstractSerializer } from "../abstractSerializer";
import { IsEmail, IsNotEmpty, IsOptional, IsString, IsUUID, Matches } from "class-validator";

interface IInputUpdateClientProps  extends IInputUpdateClientDto {
  uuid: string
}


export class InputUpdateClient extends AbstractSerializer<IInputUpdateClientProps> {
  @IsUUID('4')
  @IsNotEmpty()
  uuid: string

  @IsString()
  @IsOptional()
  name: string

  @IsEmail()
  @IsOptional()
  email: string
  
  @IsString()
  @IsOptional()
  phone: string
  
  @IsOptional()
  @Matches(/^\d+\s?,\s?\d+$/, {
    message: "Address must match one of these patterns: '1, 1' | '1,1' | '1 , 1' | '1 ,1'"
  })
  address: string
}