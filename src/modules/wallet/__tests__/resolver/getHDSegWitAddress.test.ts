import { ApolloServer } from "apollo-server-express"
import { buildSchemaSync } from "type-graphql"
import Container from "typedi"

import { GetHDSegWitAddressDto } from "../../dto/getHDSegWitAddress.dto"
import { AddressEntity } from "../../entity/address.entity"
import { WalletResolver } from "../../wallet.resolver"
import { WalletService } from "../../wallet.service"

describe("WalletResolver.getHDSegWitAddress", () => {
  const schema = buildSchemaSync({
    resolvers: [WalletResolver],
    container: Container,
    authChecker: null
  })

  const server = new ApolloServer({ schema })

  it("should fail if the seed not consist of words of predefined wordlist", async () => {
    Container.set({ id: WalletResolver, type: WalletResolver })
    Container.set(WalletService, { getHDSegWitAddressBySeedAndPath: jest.fn() })

    const walletService = Container.get(WalletService)

    const mockedAddressEntity = AddressEntity.fromObject({
      address: "bc1q88ex0thyhzgxxfqshr2s2xft0mfn40g6vma09z",
      publicKeyHexDecimal: "020f8e9d3cb6c94a6dfcdbabeb70bfeb2eafa7b75e9f93856edba155eb0c0ab9ae"
    })

    const mockedWalletServiceGeneratedAddress = jest
      .spyOn(walletService, "getHDSegWitAddressBySeedAndPath")
      .mockResolvedValue(mockedAddressEntity)

    const query = `
        query WalletGetHDSegWitAddress($input: WalletGetSegWitAddressDto!) {
            WalletGetHDSegWitAddress(input: $input) {
            address
            publicKeyHexDecimal
            }
        }
    `
    const variables = {
      input: {
        // uneconomic is not from wordlist
        seed: "uneconomic brief original title elbow build focus south recipe sphere edge emotion comfort exact dress great wife glide perfect coin nephew pelican task head",
        path: "m/84'/0'/0'/0/0"
      }
    }

    const result = await server.executeOperation({ query, variables })

    expect(result.errors[0].message).toEqual("Argument Validation Error")
    expect(mockedWalletServiceGeneratedAddress).not.toHaveBeenCalled()
  })

  it("should fail if the seed not in english", async () => {
    Container.set({ id: WalletResolver, type: WalletResolver })
    Container.set(WalletService, { getHDSegWitAddressBySeedAndPath: jest.fn() })

    const walletService = Container.get(WalletService)

    const mockedAddressEntity = AddressEntity.fromObject({
      address: "bc1q88ex0thyhzgxxfqshr2s2xft0mfn40g6vma09z",
      publicKeyHexDecimal: "020f8e9d3cb6c94a6dfcdbabeb70bfeb2eafa7b75e9f93856edba155eb0c0ab9ae"
    })

    const mockedWalletServiceGeneratedAddress = jest
      .spyOn(walletService, "getHDSegWitAddressBySeedAndPath")
      .mockResolvedValue(mockedAddressEntity)

    const query = `
      query WalletGetHDSegWitAddress($input: WalletGetSegWitAddressDto!) {
          WalletGetHDSegWitAddress(input: $input) {
          address
          publicKeyHexDecimal
          }
      }
    `
    const variables = {
      input: {
        // non-english word
        seed: "你 brief original title elbow build focus south recipe sphere edge emotion comfort exact dress great wife glide perfect coin nephew pelican task head",
        path: "m/84'/0'/0'/0/0"
      }
    }

    const result = await server.executeOperation({ query, variables })

    expect(result.errors[0].message).toEqual("Argument Validation Error")
    expect(mockedWalletServiceGeneratedAddress).not.toHaveBeenCalled()
  })

  it("should fail if the seed is longer than 24 words", async () => {
    Container.set({ id: WalletResolver, type: WalletResolver })
    Container.set(WalletService, { getHDSegWitAddressBySeedAndPath: jest.fn() })

    const walletService = Container.get(WalletService)

    const mockedAddressEntity = AddressEntity.fromObject({
      address: "bc1q88ex0thyhzgxxfqshr2s2xft0mfn40g6vma09z",
      publicKeyHexDecimal: "020f8e9d3cb6c94a6dfcdbabeb70bfeb2eafa7b75e9f93856edba155eb0c0ab9ae"
    })

    const mockedWalletServiceGeneratedAddress = jest
      .spyOn(walletService, "getHDSegWitAddressBySeedAndPath")
      .mockResolvedValue(mockedAddressEntity)

    const query = `
      query WalletGetHDSegWitAddress($input: WalletGetSegWitAddressDto!) {
          WalletGetHDSegWitAddress(input: $input) {
          address
          publicKeyHexDecimal
          }
      }
    `
    const variables = {
      input: {
        seed: "industry upon kick idle detail path energy question language direct shrug inch expire sing boil sight olympic sphere expect marriage bitter nominee ribbon gossip ribbon gossip",
        path: "m/84'/0'/0'/0/0"
      }
    }

    const result = await server.executeOperation({ query, variables })

    expect(result.errors[0].message).toEqual("Argument Validation Error")
    expect(mockedWalletServiceGeneratedAddress).not.toHaveBeenCalled()
  })

  it("should fail if the seed is smaller than 12 words", async () => {
    Container.set({ id: WalletResolver, type: WalletResolver })
    Container.set(WalletService, { getHDSegWitAddressBySeedAndPath: jest.fn() })

    const walletService = Container.get(WalletService)

    const mockedAddressEntity = AddressEntity.fromObject({
      address: "bc1q88ex0thyhzgxxfqshr2s2xft0mfn40g6vma09z",
      publicKeyHexDecimal: "020f8e9d3cb6c94a6dfcdbabeb70bfeb2eafa7b75e9f93856edba155eb0c0ab9ae"
    })

    const mockedWalletServiceGeneratedAddress = jest
      .spyOn(walletService, "getHDSegWitAddressBySeedAndPath")
      .mockResolvedValue(mockedAddressEntity)

    const query = `
        query WalletGetHDSegWitAddress($input: WalletGetSegWitAddressDto!) {
            WalletGetHDSegWitAddress(input: $input) {
            address
            publicKeyHexDecimal
            }
        }
    `
    const variables = {
      input: {
        seed: "purse brief original",
        path: "m/84'/0'/0'/0/0"
      }
    }

    const result = await server.executeOperation({ query, variables })

    expect(result.errors[0].message).toEqual("Argument Validation Error")
    expect(mockedWalletServiceGeneratedAddress).not.toHaveBeenCalled()
  })

  it("should fail if the seed length is not a multiple of 3", async () => {
    Container.set({ id: WalletResolver, type: WalletResolver })
    Container.set(WalletService, { getHDSegWitAddressBySeedAndPath: jest.fn() })

    const walletService = Container.get(WalletService)

    const mockedAddressEntity = AddressEntity.fromObject({
      address: "bc1q88ex0thyhzgxxfqshr2s2xft0mfn40g6vma09z",
      publicKeyHexDecimal: "020f8e9d3cb6c94a6dfcdbabeb70bfeb2eafa7b75e9f93856edba155eb0c0ab9ae"
    })

    const mockedWalletServiceGeneratedAddress = jest
      .spyOn(walletService, "getHDSegWitAddressBySeedAndPath")
      .mockResolvedValue(mockedAddressEntity)

    const query = `
        query WalletGetHDSegWitAddress($input: WalletGetSegWitAddressDto!) {
            WalletGetHDSegWitAddress(input: $input) {
            address
            publicKeyHexDecimal
            }
        }
    `
    const variables = {
      input: {
        seed: "purse brief original title elbow build focus south recipe sphere edge emotion comfort exact dress great wife glide perfect coin nephew pelican task head head",
        path: "m/84'/0'/0'/0/0"
      }
    }

    const result = await server.executeOperation({ query, variables })

    expect(result.errors[0].message).toEqual("Argument Validation Error")
    expect(mockedWalletServiceGeneratedAddress).not.toHaveBeenCalled()
  })

  it("should fail if the path not starts with m", async () => {
    Container.set({ id: WalletResolver, type: WalletResolver })
    Container.set(WalletService, { getHDSegWitAddressBySeedAndPath: jest.fn() })

    const walletService = Container.get(WalletService)

    const mockedAddressEntity = AddressEntity.fromObject({
      address: "bc1q88ex0thyhzgxxfqshr2s2xft0mfn40g6vma09z",
      publicKeyHexDecimal: "020f8e9d3cb6c94a6dfcdbabeb70bfeb2eafa7b75e9f93856edba155eb0c0ab9ae"
    })

    const mockedWalletServiceGeneratedAddress = jest
      .spyOn(walletService, "getHDSegWitAddressBySeedAndPath")
      .mockResolvedValue(mockedAddressEntity)

    const query = `
        query WalletGetHDSegWitAddress($input: WalletGetSegWitAddressDto!) {
            WalletGetHDSegWitAddress(input: $input) {
            address
            publicKeyHexDecimal
            }
        }
    `
    const variables = {
      input: {
        seed: "purse brief original title elbow build focus south recipe sphere edge emotion comfort exact dress great wife glide perfect coin nephew pelican task head",
        path: "n/84'/0'/0'/0/0"
      }
    }

    const result = await server.executeOperation({ query, variables })

    expect(result.errors[0].message).toEqual("Argument Validation Error")
    expect(mockedWalletServiceGeneratedAddress).not.toHaveBeenCalled()
  })

  it("should fail if the path not in bip84 format", async () => {
    Container.set({ id: WalletResolver, type: WalletResolver })
    Container.set(WalletService, { getHDSegWitAddressBySeedAndPath: jest.fn() })

    const walletService = Container.get(WalletService)

    const mockedAddressEntity = AddressEntity.fromObject({
      address: "bc1q88ex0thyhzgxxfqshr2s2xft0mfn40g6vma09z",
      publicKeyHexDecimal: "020f8e9d3cb6c94a6dfcdbabeb70bfeb2eafa7b75e9f93856edba155eb0c0ab9ae"
    })

    const mockedWalletServiceGeneratedAddress = jest
      .spyOn(walletService, "getHDSegWitAddressBySeedAndPath")
      .mockResolvedValue(mockedAddressEntity)

    const query = `
        query WalletGetHDSegWitAddress($input: WalletGetSegWitAddressDto!) {
            WalletGetHDSegWitAddress(input: $input) {
            address
            publicKeyHexDecimal
            }
        }
    `
    const variables = {
      input: {
        seed: "purse brief original title elbow build focus south recipe sphere edge emotion comfort exact dress great wife glide perfect coin nephew pelican task head",
        path: "m/49'/0'/0'/0/0"
      }
    }

    const result = await server.executeOperation({ query, variables })

    expect(result.errors[0].message).toEqual("Argument Validation Error")
    expect(mockedWalletServiceGeneratedAddress).not.toHaveBeenCalled()
  })

  it("should fail if the path not bitcoin network", async () => {
    Container.set({ id: WalletResolver, type: WalletResolver })
    Container.set(WalletService, { getHDSegWitAddressBySeedAndPath: jest.fn() })

    const walletService = Container.get(WalletService)

    const mockedAddressEntity = AddressEntity.fromObject({
      address: "bc1q88ex0thyhzgxxfqshr2s2xft0mfn40g6vma09z",
      publicKeyHexDecimal: "020f8e9d3cb6c94a6dfcdbabeb70bfeb2eafa7b75e9f93856edba155eb0c0ab9ae"
    })

    const mockedWalletServiceGeneratedAddress = jest
      .spyOn(walletService, "getHDSegWitAddressBySeedAndPath")
      .mockResolvedValue(mockedAddressEntity)

    const query = `
        query WalletGetHDSegWitAddress($input: WalletGetSegWitAddressDto!) {
            WalletGetHDSegWitAddress(input: $input) {
            address
            publicKeyHexDecimal
            }
        }
    `
    const variables = {
      input: {
        seed: "purse brief original title elbow build focus south recipe sphere edge emotion comfort exact dress great wife glide perfect coin nephew pelican task head",
        path: "m/84'/60'/0'/0/0"
      }
    }

    const result = await server.executeOperation({ query, variables })

    expect(result.errors[0].message).toEqual("Argument Validation Error")
    expect(mockedWalletServiceGeneratedAddress).not.toHaveBeenCalled()
  })

  it("should fail if the path not hardened at account level", async () => {
    Container.set({ id: WalletResolver, type: WalletResolver })
    Container.set(WalletService, { getHDSegWitAddressBySeedAndPath: jest.fn() })

    const walletService = Container.get(WalletService)

    const mockedAddressEntity = AddressEntity.fromObject({
      address: "bc1q88ex0thyhzgxxfqshr2s2xft0mfn40g6vma09z",
      publicKeyHexDecimal: "020f8e9d3cb6c94a6dfcdbabeb70bfeb2eafa7b75e9f93856edba155eb0c0ab9ae"
    })

    const mockedWalletServiceGeneratedAddress = jest
      .spyOn(walletService, "getHDSegWitAddressBySeedAndPath")
      .mockResolvedValue(mockedAddressEntity)

    const query = `
        query WalletGetHDSegWitAddress($input: WalletGetSegWitAddressDto!) {
            WalletGetHDSegWitAddress(input: $input) {
            address
            publicKeyHexDecimal
            }
        }
    `
    const variables = {
      input: {
        seed: "purse brief original title elbow build focus south recipe sphere edge emotion comfort exact dress great wife glide perfect coin nephew pelican task head",
        path: "m/84'/0'/0/0/0"
      }
    }

    const result = await server.executeOperation({ query, variables })

    expect(result.errors[0].message).toEqual("Argument Validation Error")
    expect(mockedWalletServiceGeneratedAddress).not.toHaveBeenCalled()
  })

  it("should fail if the path is too short", async () => {
    Container.set({ id: WalletResolver, type: WalletResolver })
    Container.set(WalletService, { getHDSegWitAddressBySeedAndPath: jest.fn() })

    const walletService = Container.get(WalletService)

    const mockedAddressEntity = AddressEntity.fromObject({
      address: "bc1q88ex0thyhzgxxfqshr2s2xft0mfn40g6vma09z",
      publicKeyHexDecimal: "020f8e9d3cb6c94a6dfcdbabeb70bfeb2eafa7b75e9f93856edba155eb0c0ab9ae"
    })

    const mockedWalletServiceGeneratedAddress = jest
      .spyOn(walletService, "getHDSegWitAddressBySeedAndPath")
      .mockResolvedValue(mockedAddressEntity)

    const query = `
        query WalletGetHDSegWitAddress($input: WalletGetSegWitAddressDto!) {
            WalletGetHDSegWitAddress(input: $input) {
            address
            publicKeyHexDecimal
            }
        }
    `
    const variables = {
      input: {
        seed: "purse brief original title elbow build focus south recipe sphere edge emotion comfort exact dress great wife glide perfect coin nephew pelican task head",
        path: "m/84'/0'"
      }
    }

    const result = await server.executeOperation({ query, variables })

    expect(result.errors[0].message).toEqual("Argument Validation Error")
    expect(mockedWalletServiceGeneratedAddress).not.toHaveBeenCalled()
  })

  it("should fail if the path is too long", async () => {
    Container.set({ id: WalletResolver, type: WalletResolver })
    Container.set(WalletService, { getHDSegWitAddressBySeedAndPath: jest.fn() })

    const walletService = Container.get(WalletService)

    const mockedAddressEntity = AddressEntity.fromObject({
      address: "bc1q88ex0thyhzgxxfqshr2s2xft0mfn40g6vma09z",
      publicKeyHexDecimal: "020f8e9d3cb6c94a6dfcdbabeb70bfeb2eafa7b75e9f93856edba155eb0c0ab9ae"
    })

    const mockedWalletServiceGeneratedAddress = jest
      .spyOn(walletService, "getHDSegWitAddressBySeedAndPath")
      .mockResolvedValue(mockedAddressEntity)

    const query = `
        query WalletGetHDSegWitAddress($input: WalletGetSegWitAddressDto!) {
            WalletGetHDSegWitAddress(input: $input) {
            address
            publicKeyHexDecimal
            }
        }
    `
    const variables = {
      input: {
        seed: "purse brief original title elbow build focus south recipe sphere edge emotion comfort exact dress great wife glide perfect coin nephew pelican task head",
        path: "m/84'/0'/0'/0/0/0/0/0/0/0/0/0/0/0/0/0/0/0/0/0/0/0/0/0/0/0/0/0/0/0/0/0/0/0/0/0/0/0/0/0/0/0/0/0/0/0/0/0/0/0/0/0/0/0/0/0/0/0/0/0/0/0/0/0/0/0/0/0/0/0/0/0/0/0/0/0/0/0/0/0/0/0/0/0/0/0/0/0/0/0/0/0/0/0/0/0/0/0/0/0/0/0/0/0/0/0/0/0/0/0/0/0/0/0/0/0/0/0/0/0/0/0/0/0/0/0/0/0/0/0/0/0/0/0/0"
      }
    }

    const result = await server.executeOperation({ query, variables })

    expect(result.errors[0].message).toEqual("Argument Validation Error")
    expect(mockedWalletServiceGeneratedAddress).not.toHaveBeenCalled()
  })

  it("should fail if the network is not bitcoin p2wpkh", async () => {
    Container.set({ id: WalletResolver, type: WalletResolver })
    Container.set(WalletService, { getHDSegWitAddressBySeedAndPath: jest.fn() })

    const walletService = Container.get(WalletService)

    const mockedAddressEntity = AddressEntity.fromObject({
      address: "bc1q88ex0thyhzgxxfqshr2s2xft0mfn40g6vma09z",
      publicKeyHexDecimal: "020f8e9d3cb6c94a6dfcdbabeb70bfeb2eafa7b75e9f93856edba155eb0c0ab9ae"
    })

    const mockedWalletServiceGeneratedAddress = jest
      .spyOn(walletService, "getHDSegWitAddressBySeedAndPath")
      .mockResolvedValue(mockedAddressEntity)

    const query = `
        query WalletGetHDSegWitAddress($input: WalletGetSegWitAddressDto!) {
            WalletGetHDSegWitAddress(input: $input) {
            address
            publicKeyHexDecimal
            }
        }
    `

    const variables = {
      input: {
        seed: "purse brief original title elbow build focus south recipe sphere edge emotion comfort exact dress great wife glide perfect coin nephew pelican task head",
        path: "m/84'/0'/0'/0/0",
        network: "bitcoin"
      }
    }

    const result = await server.executeOperation({ query, variables })

    expect(result.errors[0].message).toEqual("Argument Validation Error")
    expect(mockedWalletServiceGeneratedAddress).not.toHaveBeenCalled()
  })

  it("should fail if the path is not number or hardened number (except m)", async () => {
    Container.set({ id: WalletResolver, type: WalletResolver })
    Container.set(WalletService, { getHDSegWitAddressBySeedAndPath: jest.fn() })

    const walletService = Container.get(WalletService)

    const mockedAddressEntity = AddressEntity.fromObject({
      address: "bc1q88ex0thyhzgxxfqshr2s2xft0mfn40g6vma09z",
      publicKeyHexDecimal: "020f8e9d3cb6c94a6dfcdbabeb70bfeb2eafa7b75e9f93856edba155eb0c0ab9ae"
    })

    const mockedWalletServiceGeneratedAddress = jest
      .spyOn(walletService, "getHDSegWitAddressBySeedAndPath")
      .mockResolvedValue(mockedAddressEntity)

    const query = `
        query WalletGetHDSegWitAddress($input: WalletGetSegWitAddressDto!) {
            WalletGetHDSegWitAddress(input: $input) {
            address
            publicKeyHexDecimal
            }
        }
    `
    const variables = {
      input: {
        seed: "purse brief original title elbow build focus south recipe sphere edge emotion comfort exact dress great wife glide perfect coin nephew pelican task head",
        path: "m/84'/0'/0/0/0"
      }
    }

    const result = await server.executeOperation({ query, variables })

    expect(result.errors[0].message).toEqual("Argument Validation Error")
    expect(mockedWalletServiceGeneratedAddress).not.toHaveBeenCalled()
  })

  it("should fail if the password is too long", async () => {
    Container.set({ id: WalletResolver, type: WalletResolver })
    Container.set(WalletService, { getHDSegWitAddressBySeedAndPath: jest.fn() })

    const walletService = Container.get(WalletService)

    const mockedAddressEntity = AddressEntity.fromObject({
      address: "bc1q88ex0thyhzgxxfqshr2s2xft0mfn40g6vma09z",
      publicKeyHexDecimal: "020f8e9d3cb6c94a6dfcdbabeb70bfeb2eafa7b75e9f93856edba155eb0c0ab9ae"
    })

    const mockedWalletServiceGeneratedAddress = jest
      .spyOn(walletService, "getHDSegWitAddressBySeedAndPath")
      .mockResolvedValue(mockedAddressEntity)

    const query = `
        query WalletGetHDSegWitAddress($input: WalletGetSegWitAddressDto!) {
            WalletGetHDSegWitAddress(input: $input) {
            address
            publicKeyHexDecimal
            }
        }
    `
    const variables = {
      input: {
        seed: "purse brief original title elbow build focus south recipe sphere edge emotion comfort exact dress great wife glide perfect coin nephew pelican task head",
        path: "m/84'/0'/0'/0/0",
        password:
          "passwordpasswordpasswordpasswordpasswordpasswordpasswordpasswordpasswordpasswordpasswordpasswordpasswordpasswordpasswordpasswordpasswordpasswordpasswordpasswordpasswordpasswordpasswordpassword"
      }
    }

    const result = await server.executeOperation({ query, variables })

    expect(result.errors[0].message).toEqual("Argument Validation Error")
    expect(mockedWalletServiceGeneratedAddress).not.toHaveBeenCalled()
  })

  it("should pass default input into WalletService.getHDSegWitAddressBySeedAndPath", async () => {
    Container.set({ id: WalletResolver, type: WalletResolver })
    Container.set(WalletService, { getHDSegWitAddressBySeedAndPath: jest.fn() })

    const walletService = Container.get(WalletService)

    const mockedAddressEntity = AddressEntity.fromObject({
      address: "bc1q88ex0thyhzgxxfqshr2s2xft0mfn40g6vma09z",
      publicKeyHexDecimal: "020f8e9d3cb6c94a6dfcdbabeb70bfeb2eafa7b75e9f93856edba155eb0c0ab9ae"
    })

    const mockedWalletServiceGeneratedAddress = jest
      .spyOn(walletService, "getHDSegWitAddressBySeedAndPath")
      .mockResolvedValue(mockedAddressEntity)

    const query = `
        query WalletGetHDSegWitAddress($input: WalletGetSegWitAddressDto!) {
            WalletGetHDSegWitAddress(input: $input) {
            address
            publicKeyHexDecimal
            }
        }
    `
    const variables = {
      input: {
        seed: "purse brief original title elbow build focus south recipe sphere edge emotion comfort exact dress great wife glide perfect coin nephew pelican task head",
        path: "m/84'/0'/0'/0/0"
      }
    }

    const result = await server.executeOperation({ query, variables })

    expect(result?.data.WalletGetHDSegWitAddress).toEqual({
      address: "bc1q88ex0thyhzgxxfqshr2s2xft0mfn40g6vma09z",
      publicKeyHexDecimal: "020f8e9d3cb6c94a6dfcdbabeb70bfeb2eafa7b75e9f93856edba155eb0c0ab9ae"
    })

    expect(mockedWalletServiceGeneratedAddress).toHaveBeenCalledWith(
      GetHDSegWitAddressDto.fromObject({
        seed: "purse brief original title elbow build focus south recipe sphere edge emotion comfort exact dress great wife glide perfect coin nephew pelican task head",
        path: "m/84'/0'/0'/0/0",
        network: "bitcoin_p2wpkh",
        password: ""
      })
    )
  })

  it("should pass custom password into WalletService.getHDSegWitAddressBySeedAndPath", async () => {
    Container.set({ id: WalletResolver, type: WalletResolver })
    Container.set(WalletService, { getHDSegWitAddressBySeedAndPath: jest.fn() })

    const walletService = Container.get(WalletService)

    const mockedAddressEntity = AddressEntity.fromObject({
      address: "bc1q88ex0thyhzgxxfqshr2s2xft0mfn40g6vma09z",
      publicKeyHexDecimal: "020f8e9d3cb6c94a6dfcdbabeb70bfeb2eafa7b75e9f93856edba155eb0c0ab9ae"
    })

    const mockedWalletServiceGeneratedAddress = jest
      .spyOn(walletService, "getHDSegWitAddressBySeedAndPath")
      .mockResolvedValue(mockedAddressEntity)

    const query = `
        query WalletGetHDSegWitAddress($input: WalletGetSegWitAddressDto!) {
            WalletGetHDSegWitAddress(input: $input) {
            address
            publicKeyHexDecimal
            }
        }
    `
    const variables = {
      input: {
        seed: "purse brief original title elbow build focus south recipe sphere edge emotion comfort exact dress great wife glide perfect coin nephew pelican task head",
        path: "m/84'/0'/0'/0/0",
        password: "extra"
      }
    }

    const result = await server.executeOperation({ query, variables })

    expect(result?.data.WalletGetHDSegWitAddress).toEqual({
      address: "bc1q88ex0thyhzgxxfqshr2s2xft0mfn40g6vma09z",
      publicKeyHexDecimal: "020f8e9d3cb6c94a6dfcdbabeb70bfeb2eafa7b75e9f93856edba155eb0c0ab9ae"
    })

    expect(mockedWalletServiceGeneratedAddress).toHaveBeenCalledWith(
      GetHDSegWitAddressDto.fromObject({
        seed: "purse brief original title elbow build focus south recipe sphere edge emotion comfort exact dress great wife glide perfect coin nephew pelican task head",
        path: "m/84'/0'/0'/0/0",
        network: "bitcoin_p2wpkh",
        password: "extra"
      })
    )
  })
})
