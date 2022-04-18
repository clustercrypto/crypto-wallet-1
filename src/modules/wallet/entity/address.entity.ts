import { plainToInstance } from "class-transformer"
import { Field, ObjectType } from "type-graphql"

@ObjectType("WalletAddressEntity")
export class AddressEntity {
  @Field({ description: "The hashed address given the seed" })
  address: string

  @Field({ description: "The private key given the seed" })
  privateKey: string

  @Field({ description: "The public key given the seed" })
  publicKey: string

  static async fromObject(obj: Object): Promise<AddressEntity> {
    if (!obj) return null
    return plainToInstance(AddressEntity, obj)
  }
}
