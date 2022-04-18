import { registerDecorator, ValidationArguments, ValidationOptions } from "class-validator"

export function IsPathSeparatedBySlash(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: "IsPathSeparatedBySlash",
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: { ...validationOptions, message: "Path must be separated by '/' " },
      validator: {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        validate(value: string, _args: ValidationArguments) {
          return value[1] === "/"
        }
      }
    })
  }
}

export function IsPathStartsWithMaster(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: "IsPathStartsWithMaster",
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: { ...validationOptions, message: "Path must starts with m." },
      validator: {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        validate(value: string, _args: ValidationArguments) {
          const components = value.split("/")
          return components[0] === "m"
        }
      }
    })
  }
}

export function IsPathBIP84Purpose(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: "IsPathBIP84Purpose",
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: { ...validationOptions, message: "Path purpose must be 84'." },
      validator: {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        validate(value: string, _args: ValidationArguments) {
          const components = value.split("/")
          return components[1] === "84'"
        }
      }
    })
  }
}

export function IsPathBitcoinType(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: "IsPathBitcoinType",
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: { ...validationOptions, message: "Path must be bitcoin type marked as hardened" },
      validator: {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        validate(value: string, _args: ValidationArguments) {
          const components = value.split("/")
          return components[2] === "0'"
        }
      }
    })
  }
}

export function IsPathAccountLevelHardened(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: "IsPathAccountLevelHardened",
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: { ...validationOptions, message: "Path account level must be hardened to improve security" },
      validator: {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        validate(value: string, _args: ValidationArguments) {
          const components = value.split("/")
          return components[3].endsWith("'")
        }
      }
    })
  }
}

export function IsPathNumberOrHardenedNumber(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: "IsPathNumberOrHardenedNumber",
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: { ...validationOptions, message: "At the each level of the path, either m, or number, or number'" },
      validator: {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        validate(value: string, _args: ValidationArguments) {
          const components = value.split("/")
          const MAX_INDEX_VALUE = Math.pow(2, 31)

          for (let i = 1; i < components.length; i++) {
            const currIdx = components[i]
            const invalid: string = currIdx.replace(/^[0-9]+'?$/g, "")
            if (invalid.length > 0) {
              return false
            }

            const indexValue = parseInt(currIdx.replace("'", ""))
            if (isNaN(i)) {
              return false
            }

            if (indexValue > MAX_INDEX_VALUE) {
              return false
            }
          }
          return true
        }
      }
    })
  }
}
