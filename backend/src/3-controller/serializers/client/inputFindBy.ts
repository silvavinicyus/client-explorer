import { IsNotEmpty, IsUUID } from "class-validator";
import { AbstractSerializer } from "../abstractSerializer";

export class InputFindByClient extends AbstractSerializer<{uuid: string}> {
  @IsUUID('4')
  @IsNotEmpty()
  uuid: string
}