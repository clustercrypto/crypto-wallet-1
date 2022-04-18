import { validateMnemonic } from "bip39"
import { registerDecorator, ValidationArguments, ValidationOptions } from "class-validator"
import isEnglish from "is-english"

export function IsSeedValid(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: "IsPathStartsWithMaster",
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: {
        ...validationOptions,
        message: "Seed Phrase must be in English format."
      },
      validator: {
        validate(seed: string, _args: ValidationArguments) {
          if (!isEnglish(seed)) {
            return false
          }
          return validateMnemonic(seed)
        }
      }
    })
  }
}

export function IsSeedLengthValid(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: "IsPathStartsWithMaster",
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: {
        ...validationOptions,
        message: "Seed Phrase must be greater than or equal to 12 words and less than or equal to 24 words"
      },
      validator: {
        validate(seed: string, _args: ValidationArguments) {
          const length = seed.split(" ").length
          return length >= 12 && length <= 24 && length % 3 === 0
        }
      }
    })
  }
}
