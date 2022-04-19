import { Expose, plainToInstance } from "class-transformer"
import { Field, ObjectType } from "type-graphql"

@ObjectType("WalletSeedEntity")
export class SeedEntity {
  @Field({ description: "The mnemonic words" })
  @Expose()
  mnemonic: string

  @Field({ description: "The seed" })
  @Expose()
  seed: string

  static fromObject(obj: Object): SeedEntity {
    if (!obj) return null
    return plainToInstance(SeedEntity, obj)
  }
}
