import { Expose } from "class-transformer"
import { IsEnum, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from "class-validator"
import { Field, InputType } from "type-graphql"

import { NETWORK } from "../../../enum"
import { DTOBase } from "../../../utils/dto/base.dto"

@InputType("WalletGetSegWitAddressDto")
export class GetHDSegWitAddressDto extends DTOBase {
  @Field({ description: "The seed phrase (mnemonic)" })
  @IsNotEmpty()
  @IsString()
  @MaxLength(500)
  @Expose()
  seed: string

  @Field({ description: 'The level path to generate the address, use "\'" to mark as hardened.' })
  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  @MaxLength(300)
  @Expose()
  path: string

  @Field({ nullable: true, description: "The network option. e.g. bitcoin", defaultValue: NETWORK.BITCOIN_P2WPKH })
  @IsOptional()
  @IsString()
  @IsEnum(NETWORK)
  @Expose()
  network: string

  @Field({ nullable: true, description: "The optional bit39 password", defaultValue: "" })
  @IsOptional()
  @IsString()
  @Expose()
  password: string
}
