import { Expose } from "class-transformer"
import { ArrayMaxSize, ArrayMinSize, IsHexadecimal, IsNumber, Max, Min, ValidationError } from "class-validator"
import { Field, InputType } from "type-graphql"

import { DTOBase } from "../../../utils/dto/base.dto"

@InputType("WalletGetMultiSigP2SHAddressDto")
export class GetMultiSigP2SHAddressDto extends DTOBase {
  @Field({ description: "The number of signatures required" })
  @IsNumber()
  @Min(1)
  @Max(20)
  @Expose()
  m: number

  @Field(() => [String], { description: "The public keys in hex-decimal format" })
  @ArrayMinSize(1)
  @ArrayMaxSize(20)
  @IsHexadecimal({ each: true })
  @Expose()
  publicKeys: string[]

  validate(errors: ValidationError[]): ValidationError[] {
    if (this.m > this.publicKeys.length) {
      const error = this.buildValidationError({
        target: this,
        property: "m",
        constraints: "should not be larger than public keys total count"
      })
      errors.push(error)
    }

    return errors
  }
}
