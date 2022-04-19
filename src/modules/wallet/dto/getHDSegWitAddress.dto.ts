import { Expose } from "class-transformer"
import { IsEnum, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from "class-validator"
import { Field, InputType } from "type-graphql"

import { NETWORK } from "../../../enum"
import { DTOBase } from "../../../utils/dto/base.dto"
import {
  IsPathAccountLevelHardened,
  IsPathBIP84Purpose,
  IsPathBitcoinType,
  IsPathNumberOrHardenedNumber,
  IsPathSeparatedBySlash,
  IsPathStartsWithMaster
} from "../../../utils/validator/isValidDerivationPath.decorator"
import { IsSeedLengthValid, IsSeedValid } from "../../../utils/validator/isValidSeed.decorator"

@InputType("WalletGetSegWitAddressDto")
export class GetHDSegWitAddressDto extends DTOBase {
  @Field({ description: "The seed phrase (mnemonic)" })
  @IsNotEmpty()
  @IsString()
  @IsSeedValid()
  @IsSeedLengthValid()
  @MaxLength(500)
  @Expose()
  seed: string

  // only bip-94 proposal is supported
  @Field({
    description: `The level path to generate the address, use \"'\" to mark as hardened.\
      \n\"m / purpose' / coin_type' / account' / change / address_index\" \
      \n - must starts with m \
      \n - currently we only support purpose to be 84' \
      \n - coin_type to be 0' (bitcoin) \
      \n - account level must be hardened to improve security\
      \n e.g "m/84'/0'/0'/0/0", (crypto wallet uses this one to generate a bitcoin address for receiving)
      `
  })
  @IsNotEmpty()
  @IsString()
  @IsPathSeparatedBySlash()
  @IsPathStartsWithMaster()
  @IsPathBIP84Purpose()
  @IsPathBitcoinType()
  @IsPathAccountLevelHardened()
  @IsPathNumberOrHardenedNumber()
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
  @MaxLength(100)
  @Expose()
  password: string
}
