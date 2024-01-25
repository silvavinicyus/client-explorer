import { IInputCreateClientDto } from "@business/dto/client/create";
import { AbstractSerializer } from "../abstractSerializer";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

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
}