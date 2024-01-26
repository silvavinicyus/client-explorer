import { IInputCreateClientDto } from "@business/dto/client/create";
import { AbstractSerializer } from "../abstractSerializer";
import { IsEmail, IsNotEmpty, IsString, Matches } from "class-validator";

export class InputCreateClient extends AbstractSerializer<IInputCreateClientDto> {
  @IsString()
  @IsNotEmpty()
  name: string

  @IsEmail()
  @IsNotEmpty()
  email: string

  @IsNotEmpty()
  @IsString()
  phone: string

  @IsString()
  @Matches(/^\d+\s?,\s?\d+$/, {
    message: "Address must match one of these patterns: '1, 1' | '1,1' | '1 , 1' | '1 ,1'"
  })
  address: string
}