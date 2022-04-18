import { Expose, Transform } from "class-transformer"
import { IsNumber } from "class-validator"
import { Field, InputType } from "type-graphql"

import { DTOBase } from "../../../utils/dto/base.dto"

@InputType("WalletGetMultiSigP2SHAddressDto")
export class GetMultiSigP2SHAddressDto extends DTOBase {
  @Field({ description: "The number of signatures in question" })
  @IsNumber()
  @Expose()
  m: number

  @Field(() => [String], { description: "The public keys" })
  @Transform(({ obj }) => obj.publicKeys.map((key: string) => Buffer.from(key, "hex")), {
    toClassOnly: true
  })
  @Expose()
  publicKeys: Buffer[]
}
