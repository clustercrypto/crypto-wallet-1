import { Expose, plainToInstance } from "class-transformer"
import { Field, ObjectType } from "type-graphql"

@ObjectType("WalletAddressEntity", { description: "The Address Entity" })
export class AddressEntity {
  @Field({ description: "The hashed address given the seed" })
  @Expose()
  address: string

  @Field({ description: "The private key in base58 format", nullable: true })
  @Expose()
  privateKeyBase58?: string

  @Field({ description: "The public key in base58 format", nullable: true })
  @Expose()
  publicKeyBase58?: string

  @Field({ description: "The private key in hex decimal format", nullable: true })
  @Expose()
  privateKeyHexDecimal?: string

  @Field({ description: "The public key in hex decimal format", nullable: true })
  @Expose()
  publicKeyHexDecimal?: string

  @Field({ description: "The redeem scripts hash", nullable: true })
  @Expose()
  redeemScriptsHexDecimal?: string

  static fromObject(obj: Object): AddressEntity {
    if (!obj) return null
    return plainToInstance(AddressEntity, obj)
  }
}
