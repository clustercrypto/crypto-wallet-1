import { Expose, plainToInstance } from "class-transformer"
import { Field, ObjectType } from "type-graphql"

@ObjectType("WalletAddressEntity", { description: "The Address Entity" })
export class AddressEntity {
  @Field({ description: "The hashed address given the seed" })
  @Expose()
  address: string

  @Field({ description: "The private key given the seed", nullable: true })
  @Expose()
  privateKey?: string

  @Field({ description: "The public key given the seed", nullable: true })
  @Expose()
  publicKey?: string

  static async fromObject(obj: Object): Promise<AddressEntity> {
    if (!obj) return null
    return plainToInstance(AddressEntity, obj)
  }
}
