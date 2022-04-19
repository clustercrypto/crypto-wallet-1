import { Expose } from "class-transformer"
import { IsNumber } from "class-validator"
import { Field, InputType } from "type-graphql"

import { DTOBase } from "../../../utils/dto/base.dto"

@InputType("WalletGetMultiSigP2SHAddressDto")
export class GetMultiSigP2SHAddressDto extends DTOBase {
  @Field({ description: "The number of signatures required" })
  @IsNumber()
  @Expose()
  m: number

  @Field(() => [String], { description: "The public keys" })
  @Expose()
  publicKeys: string[]
}
