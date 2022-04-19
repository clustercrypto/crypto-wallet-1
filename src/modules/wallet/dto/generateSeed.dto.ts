import { Expose } from "class-transformer"
import { IsIn, IsOptional, IsString, MaxLength } from "class-validator"
import { Field, InputType } from "type-graphql"

import { DTOBase } from "../../../utils/dto/base.dto"

@InputType("WalletGenerateSeedDto")
export class GenerateSeedDto extends DTOBase {
  @Field({ description: "The language of the mnemonic words", nullable: true, defaultValue: "english" })
  @IsOptional()
  @IsIn(["english"])
  @Expose()
  language: string

  @Field({ description: "The number of words in the mnemonic words", nullable: true, defaultValue: "12" })
  @IsOptional()
  @IsIn([12, 15, 18, 24])
  @Expose()
  length: number

  @Field({ nullable: true, description: "The optional bit39 password" })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  @Expose()
  password?: string
}
