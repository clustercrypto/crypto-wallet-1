import { ApolloServer } from "apollo-server-express"
import { buildSchemaSync } from "type-graphql"
import Container from "typedi"

import { GenerateSeedDto } from "../../dto/generateSeed.dto"
import { SeedEntity } from "../../entity/seed.entity"
import { WalletResolver } from "../../wallet.resolver"
import { WalletService } from "../../wallet.service"

describe("WalletResolver.generateSeed", () => {
  const schema = buildSchemaSync({
    resolvers: [WalletResolver],
    container: Container,
    authChecker: null
  })

  const server = new ApolloServer({ schema })

  it("should fail if the password length is over 100", async () => {
    Container.set({ id: WalletResolver, type: WalletResolver })
    Container.set(WalletService, { generateSeed: jest.fn() })

    const walletService = Container.get(WalletService)

    const mockedSeedEntity = SeedEntity.fromObject({
      mnemonic:
        "purse brief original title elbow build focus south recipe sphere edge emotion comfort exact dress great wife glide perfect coin nephew pelican task head",
      seed: "e1e9d8564d3a48b0f4225163bc4411a3824d57e619e9862bf3a83deff4d556a68586bafdd3f811e43e6bcff5c7c955f07fb65eee1445e710bf1d8438b1d8807a"
    })
    const mockedWalletServiceGenerateSeed = jest
      .spyOn(walletService, "generateSeed")
      .mockResolvedValue(mockedSeedEntity)

    const query = `
        query WalletGenerateSeed($input: WalletGenerateSeedDto!) {
            WalletGenerateSeed(input: $input) {
            mnemonic
            seed
            }
        }
    `
    const variables = {
      input: {
        password:
          "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
      }
    }

    const result = await server.executeOperation({ query: query, variables })

    expect(result.errors[0].message).toEqual("Argument Validation Error")
    expect(mockedWalletServiceGenerateSeed).not.toHaveBeenCalled()
  })
  it("should fail if the language is not english", async () => {
    Container.set({ id: WalletResolver, type: WalletResolver })
    Container.set(WalletService, { generateSeed: jest.fn() })

    const walletService = Container.get(WalletService)

    const mockedSeedEntity = SeedEntity.fromObject({
      mnemonic:
        "purse brief original title elbow build focus south recipe sphere edge emotion comfort exact dress great wife glide perfect coin nephew pelican task head",
      seed: "e1e9d8564d3a48b0f4225163bc4411a3824d57e619e9862bf3a83deff4d556a68586bafdd3f811e43e6bcff5c7c955f07fb65eee1445e710bf1d8438b1d8807a"
    })
    const mockedWalletServiceGenerateSeed = jest
      .spyOn(walletService, "generateSeed")
      .mockResolvedValue(mockedSeedEntity)

    const query = `
        query WalletGenerateSeed($input: WalletGenerateSeedDto!) {
            WalletGenerateSeed(input: $input) {
            mnemonic
            seed
            }
        }
    `
    const variables = { input: { language: "korean" } }

    const result = await server.executeOperation({ query: query, variables })

    expect(result.errors[0].message).toEqual("Argument Validation Error")
    expect(mockedWalletServiceGenerateSeed).not.toHaveBeenCalled()
  })

  it("should fail if the length is not a multiple of 3", async () => {
    Container.set({ id: WalletResolver, type: WalletResolver })
    Container.set(WalletService, { generateSeed: jest.fn() })

    const walletService = Container.get(WalletService)

    const mockedSeedEntity = SeedEntity.fromObject({
      mnemonic:
        "purse brief original title elbow build focus south recipe sphere edge emotion comfort exact dress great wife glide perfect coin nephew pelican task head",
      seed: "e1e9d8564d3a48b0f4225163bc4411a3824d57e619e9862bf3a83deff4d556a68586bafdd3f811e43e6bcff5c7c955f07fb65eee1445e710bf1d8438b1d8807a"
    })
    const mockedWalletServiceGenerateSeed = jest
      .spyOn(walletService, "generateSeed")
      .mockResolvedValue(mockedSeedEntity)

    const query = `
        query WalletGenerateSeed($input: WalletGenerateSeedDto!) {
            WalletGenerateSeed(input: $input) {
            mnemonic
            seed
            }
        }
    `
    const variables = { input: { length: 16 } }

    const result = await server.executeOperation({ query: query, variables })

    expect(result.errors[0].message).toEqual("Argument Validation Error")
    expect(mockedWalletServiceGenerateSeed).not.toHaveBeenCalled()
  })

  it("should fail if the length is smaller than 12", async () => {
    Container.set({ id: WalletResolver, type: WalletResolver })
    Container.set(WalletService, { generateSeed: jest.fn() })

    const walletService = Container.get(WalletService)

    const mockedSeedEntity = SeedEntity.fromObject({
      mnemonic:
        "purse brief original title elbow build focus south recipe sphere edge emotion comfort exact dress great wife glide perfect coin nephew pelican task head",
      seed: "e1e9d8564d3a48b0f4225163bc4411a3824d57e619e9862bf3a83deff4d556a68586bafdd3f811e43e6bcff5c7c955f07fb65eee1445e710bf1d8438b1d8807a"
    })
    const mockedWalletServiceGenerateSeed = jest
      .spyOn(walletService, "generateSeed")
      .mockResolvedValue(mockedSeedEntity)

    const query = `
        query WalletGenerateSeed($input: WalletGenerateSeedDto!) {
            WalletGenerateSeed(input: $input) {
            mnemonic
            seed
            }
        }
    `
    const variables = { input: { length: 9 } }

    const result = await server.executeOperation({ query: query, variables })

    expect(result.errors[0].message).toEqual("Argument Validation Error")
    expect(mockedWalletServiceGenerateSeed).not.toHaveBeenCalled()
  })
  it("should fail if the length is bigger than 24", async () => {
    Container.set({ id: WalletResolver, type: WalletResolver })
    Container.set(WalletService, { generateSeed: jest.fn() })

    const walletService = Container.get(WalletService)

    const mockedSeedEntity = SeedEntity.fromObject({
      mnemonic:
        "purse brief original title elbow build focus south recipe sphere edge emotion comfort exact dress great wife glide perfect coin nephew pelican task head",
      seed: "e1e9d8564d3a48b0f4225163bc4411a3824d57e619e9862bf3a83deff4d556a68586bafdd3f811e43e6bcff5c7c955f07fb65eee1445e710bf1d8438b1d8807a"
    })
    const mockedWalletServiceGenerateSeed = jest
      .spyOn(walletService, "generateSeed")
      .mockResolvedValue(mockedSeedEntity)

    const query = `
        query WalletGenerateSeed($input: WalletGenerateSeedDto!) {
            WalletGenerateSeed(input: $input) {
            mnemonic
            seed
            }
        }
    `
    const variables = { input: { length: 27 } }

    const result = await server.executeOperation({ query: query, variables })

    expect(result.errors[0].message).toEqual("Argument Validation Error")
    expect(mockedWalletServiceGenerateSeed).not.toHaveBeenCalled()
  })

  it("should pass custom length and password into WalletService.generateSeed", async () => {
    Container.set({ id: WalletResolver, type: WalletResolver })
    Container.set(WalletService, { generateSeed: jest.fn() })

    const walletService = Container.get(WalletService)

    const mockedSeedEntity = SeedEntity.fromObject({
      mnemonic:
        "purse brief original title elbow build focus south recipe sphere edge emotion comfort exact dress great wife glide perfect coin nephew pelican task head",
      seed: "e1e9d8564d3a48b0f4225163bc4411a3824d57e619e9862bf3a83deff4d556a68586bafdd3f811e43e6bcff5c7c955f07fb65eee1445e710bf1d8438b1d8807a"
    })
    const mockedWalletServiceGenerateSeed = jest
      .spyOn(walletService, "generateSeed")
      .mockResolvedValue(mockedSeedEntity)

    const query = `
        query WalletGenerateSeed($input: WalletGenerateSeedDto!) {
            WalletGenerateSeed(input: $input) {
            mnemonic
            seed
            }
        }
    `
    const variables = { input: { length: 24, password: "extra" } }

    const result = await server.executeOperation({ query: query, variables })

    expect(result?.data.WalletGenerateSeed).toEqual({
      mnemonic:
        "purse brief original title elbow build focus south recipe sphere edge emotion comfort exact dress great wife glide perfect coin nephew pelican task head",
      seed: "e1e9d8564d3a48b0f4225163bc4411a3824d57e619e9862bf3a83deff4d556a68586bafdd3f811e43e6bcff5c7c955f07fb65eee1445e710bf1d8438b1d8807a"
    })

    expect(mockedWalletServiceGenerateSeed).toHaveBeenCalledWith(
      GenerateSeedDto.fromObject({ language: "english", length: 24, password: "extra" })
    )
  })

  it("should pass default length and password into WalletService.generateSeed", async () => {
    Container.set({ id: WalletResolver, type: WalletResolver })
    Container.set(WalletService, { generateSeed: jest.fn() })

    const walletService = Container.get(WalletService)

    const mockedSeedEntity = SeedEntity.fromObject({
      mnemonic:
        "purse brief original title elbow build focus south recipe sphere edge emotion comfort exact dress great wife glide perfect coin nephew pelican task head",
      seed: "e1e9d8564d3a48b0f4225163bc4411a3824d57e619e9862bf3a83deff4d556a68586bafdd3f811e43e6bcff5c7c955f07fb65eee1445e710bf1d8438b1d8807a"
    })
    const mockedWalletServiceGenerateSeed = jest
      .spyOn(walletService, "generateSeed")
      .mockResolvedValue(mockedSeedEntity)

    const query = `
        query WalletGenerateSeed($input: WalletGenerateSeedDto!) {
            WalletGenerateSeed(input: $input) {
            mnemonic
            seed
            }
        }     
    `

    const variables = { input: {} }
    const result = await server.executeOperation({ query: query, variables })

    expect(result?.data.WalletGenerateSeed).toEqual({
      mnemonic:
        "purse brief original title elbow build focus south recipe sphere edge emotion comfort exact dress great wife glide perfect coin nephew pelican task head",
      seed: "e1e9d8564d3a48b0f4225163bc4411a3824d57e619e9862bf3a83deff4d556a68586bafdd3f811e43e6bcff5c7c955f07fb65eee1445e710bf1d8438b1d8807a"
    })

    expect(mockedWalletServiceGenerateSeed).toHaveBeenCalledWith(
      GenerateSeedDto.fromObject({ language: "english", length: 12 })
    )
  })
})
