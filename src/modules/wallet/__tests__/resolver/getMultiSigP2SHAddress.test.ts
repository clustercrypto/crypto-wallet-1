import { ApolloServer } from "apollo-server-express"
import { buildSchemaSync } from "type-graphql"
import Container from "typedi"

import { GetMultiSigP2SHAddressDto } from "../../dto/getMultiSigP2SHAddress.dto"
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

  it("should fail if m equals to 0", async () => {
    Container.set({ id: WalletResolver, type: WalletResolver })
    Container.set(WalletService, { getMultiSigP2SHAddress: jest.fn() })

    const walletService = Container.get(WalletService)

    const mockedAddressEntity = AddressEntity.fromObject({
      address: "3QV15CiGL9bMzkBjVc4686n4u25XPacycu",
      redeemScriptsHexDecimal:
        "522102ca23646d58bec31302312797835825ae7e72acd7d6408a89548b237ef4b35a4c2102d2300555d518fea61e80fbc3cfedfccf8f397b7eb32f72cc82753a371c5e5db32103466cc8b0f7e4a2b46d01697aad64710f38997f60ce75c28daf6fec8a52fd18ef2103f03b1fd786f65a4e9f4097ef76481626542ade93dfe98dfb47f63aaabc6dea1e54ae"
    })

    const mockedWalletServiceGeneratedAddress = jest
      .spyOn(walletService, "getMultiSigP2SHAddress")
      .mockResolvedValue(mockedAddressEntity)

    const query = `
        query WalletGetMultiSigP2SHAddress($input: WalletGetMultiSigP2SHAddressDto!) {
            WalletGetMultiSigP2SHAddress(input: $input) {
                address
                redeemScriptsHexDecimal
            }
        }
    `
    const variables = {
      input: {
        m: 0,
        publicKeys: [
          "02ca23646d58bec31302312797835825ae7e72acd7d6408a89548b237ef4b35a4c",
          "02d2300555d518fea61e80fbc3cfedfccf8f397b7eb32f72cc82753a371c5e5db3",
          "03466cc8b0f7e4a2b46d01697aad64710f38997f60ce75c28daf6fec8a52fd18ef",
          "03f03b1fd786f65a4e9f4097ef76481626542ade93dfe98dfb47f63aaabc6dea1e"
        ]
      }
    }

    const result = await server.executeOperation({ query, variables })

    expect(result.errors[0].message).toEqual("Argument Validation Error")
    expect(mockedWalletServiceGeneratedAddress).not.toHaveBeenCalled()
  })

  it("should fail if the m bigger than 20", async () => {
    Container.set({ id: WalletResolver, type: WalletResolver })
    Container.set(WalletService, { getMultiSigP2SHAddress: jest.fn() })

    const walletService = Container.get(WalletService)

    const mockedAddressEntity = AddressEntity.fromObject({
      address: "3QV15CiGL9bMzkBjVc4686n4u25XPacycu",
      redeemScriptsHexDecimal:
        "522102ca23646d58bec31302312797835825ae7e72acd7d6408a89548b237ef4b35a4c2102d2300555d518fea61e80fbc3cfedfccf8f397b7eb32f72cc82753a371c5e5db32103466cc8b0f7e4a2b46d01697aad64710f38997f60ce75c28daf6fec8a52fd18ef2103f03b1fd786f65a4e9f4097ef76481626542ade93dfe98dfb47f63aaabc6dea1e54ae"
    })

    const mockedWalletServiceGeneratedAddress = jest
      .spyOn(walletService, "getMultiSigP2SHAddress")
      .mockResolvedValue(mockedAddressEntity)

    const query = `
        query WalletGetMultiSigP2SHAddress($input: WalletGetMultiSigP2SHAddressDto!) {
            WalletGetMultiSigP2SHAddress(input: $input) {
                address
                redeemScriptsHexDecimal
            }
        }
    `
    const variables = {
      input: {
        m: 21,
        publicKeys: [
          "02ca23646d58bec31302312797835825ae7e72acd7d6408a89548b237ef4b35a4c",
          "02d2300555d518fea61e80fbc3cfedfccf8f397b7eb32f72cc82753a371c5e5db3",
          "03466cc8b0f7e4a2b46d01697aad64710f38997f60ce75c28daf6fec8a52fd18ef",
          "03f03b1fd786f65a4e9f4097ef76481626542ade93dfe98dfb47f63aaabc6dea1e"
        ]
      }
    }

    const result = await server.executeOperation({ query, variables })

    expect(result.errors[0].message).toEqual("Argument Validation Error")
    expect(mockedWalletServiceGeneratedAddress).not.toHaveBeenCalled()
  })

  it("should fail if the m bigger than total number of public keys", async () => {
    Container.set({ id: WalletResolver, type: WalletResolver })
    Container.set(WalletService, { getMultiSigP2SHAddress: jest.fn() })

    const walletService = Container.get(WalletService)

    const mockedAddressEntity = AddressEntity.fromObject({
      address: "3QV15CiGL9bMzkBjVc4686n4u25XPacycu",
      redeemScriptsHexDecimal:
        "522102ca23646d58bec31302312797835825ae7e72acd7d6408a89548b237ef4b35a4c2102d2300555d518fea61e80fbc3cfedfccf8f397b7eb32f72cc82753a371c5e5db32103466cc8b0f7e4a2b46d01697aad64710f38997f60ce75c28daf6fec8a52fd18ef2103f03b1fd786f65a4e9f4097ef76481626542ade93dfe98dfb47f63aaabc6dea1e54ae"
    })

    const mockedWalletServiceGeneratedAddress = jest
      .spyOn(walletService, "getMultiSigP2SHAddress")
      .mockResolvedValue(mockedAddressEntity)

    const query = `
        query WalletGetMultiSigP2SHAddress($input: WalletGetMultiSigP2SHAddressDto!) {
            WalletGetMultiSigP2SHAddress(input: $input) {
                address
                redeemScriptsHexDecimal
            }
        }
    `
    const variables = {
      input: {
        m: 5,
        publicKeys: [
          "02ca23646d58bec31302312797835825ae7e72acd7d6408a89548b237ef4b35a4c",
          "02d2300555d518fea61e80fbc3cfedfccf8f397b7eb32f72cc82753a371c5e5db3",
          "03466cc8b0f7e4a2b46d01697aad64710f38997f60ce75c28daf6fec8a52fd18ef",
          "03f03b1fd786f65a4e9f4097ef76481626542ade93dfe98dfb47f63aaabc6dea1e"
        ]
      }
    }

    const result = await server.executeOperation({ query, variables })

    expect(result.errors[0].message).toEqual(
      "{\n" +
        '  "GetMultiSigP2SHAddressDto.m": {\n' +
        '    "m": "should not be larger than public keys total count"\n' +
        "  }\n" +
        "}"
    )
    expect(mockedWalletServiceGeneratedAddress).not.toHaveBeenCalled()
  })

  it("should fail if no public key is provided", async () => {
    Container.set({ id: WalletResolver, type: WalletResolver })
    Container.set(WalletService, { getMultiSigP2SHAddress: jest.fn() })

    const walletService = Container.get(WalletService)

    const mockedAddressEntity = AddressEntity.fromObject({
      address: "3QV15CiGL9bMzkBjVc4686n4u25XPacycu",
      redeemScriptsHexDecimal:
        "522102ca23646d58bec31302312797835825ae7e72acd7d6408a89548b237ef4b35a4c2102d2300555d518fea61e80fbc3cfedfccf8f397b7eb32f72cc82753a371c5e5db32103466cc8b0f7e4a2b46d01697aad64710f38997f60ce75c28daf6fec8a52fd18ef2103f03b1fd786f65a4e9f4097ef76481626542ade93dfe98dfb47f63aaabc6dea1e54ae"
    })

    const mockedWalletServiceGeneratedAddress = jest
      .spyOn(walletService, "getMultiSigP2SHAddress")
      .mockResolvedValue(mockedAddressEntity)

    const query = `
        query WalletGetMultiSigP2SHAddress($input: WalletGetMultiSigP2SHAddressDto!) {
            WalletGetMultiSigP2SHAddress(input: $input) {
                address
                redeemScriptsHexDecimal
            }
        }
    `
    const variables = {
      input: {
        m: 2,
        publicKeys: []
      }
    }

    const result = await server.executeOperation({ query, variables })

    expect(result.errors[0].message).toEqual("Argument Validation Error")
    expect(mockedWalletServiceGeneratedAddress).not.toHaveBeenCalled()
  })

  it("should fail if there are more than 20 public keys", async () => {
    Container.set({ id: WalletResolver, type: WalletResolver })
    Container.set(WalletService, { getMultiSigP2SHAddress: jest.fn() })

    const walletService = Container.get(WalletService)

    const mockedAddressEntity = AddressEntity.fromObject({
      address: "3QV15CiGL9bMzkBjVc4686n4u25XPacycu",
      redeemScriptsHexDecimal:
        "522102ca23646d58bec31302312797835825ae7e72acd7d6408a89548b237ef4b35a4c2102d2300555d518fea61e80fbc3cfedfccf8f397b7eb32f72cc82753a371c5e5db32103466cc8b0f7e4a2b46d01697aad64710f38997f60ce75c28daf6fec8a52fd18ef2103f03b1fd786f65a4e9f4097ef76481626542ade93dfe98dfb47f63aaabc6dea1e54ae"
    })

    const mockedWalletServiceGeneratedAddress = jest
      .spyOn(walletService, "getMultiSigP2SHAddress")
      .mockResolvedValue(mockedAddressEntity)

    const query = `
        query WalletGetMultiSigP2SHAddress($input: WalletGetMultiSigP2SHAddressDto!) {
            WalletGetMultiSigP2SHAddress(input: $input) {
                address
                redeemScriptsHexDecimal
            }
        }
    `
    const variables = {
      input: {
        m: 2,
        publicKeys: [
          "02ca23646d58bec31302312797835825ae7e72acd7d6408a89548b237ef4b35a4c",
          "02d2300555d518fea61e80fbc3cfedfccf8f397b7eb32f72cc82753a371c5e5db3",
          "02d2300555d518fea61e80fbc3cfedfccf8f397b7eb32f72cc82753a371c5e5db4",
          "03466cc8b0f7e4a2b46d01697aad64710f38997f60ce75c28daf6fec8a52fd18ef",
          "03466cc8b0f7e4a2b46d01697aad64710f38997f60ce75c28daf6fec8a52fd28ef",
          "03466cc8b0f7e4a2b46d01697aad64710f38997f60ce75c28daf6fec8a52fd38ef",
          "03466cc8b0f7e4a2b46d01697aad64710f38997f60ce75c28daf6fec8a52fd48ef",
          "03466cc8b0f7e4a2b46d01697aad64710f38997f60ce75c28daf6fec8a52fd58ef",
          "03466cc8b0f7e4a2b46d01697aad64710f38997f60ce75c28daf6fec8a52fd68ef",
          "03466cc8b0f7e4a2b46d01697aad64710f38997f60ce75c28daf6fec8a52fd78ef",
          "03466cc8b0f7e4a2b46d01697aad64710f38997f60ce75c28daf6fec8a52fd88ef",
          "03f03b1fd786f65a4e9f4097ef76481626542ade93dfe98dfb47f63aaabc6dea1e",
          "03f03b1fd786f65a4e9f4097ef76481626542ade93dfe98dfb47f63aaabc6dea2e",
          "03f03b1fd786f65a4e9f4097ef76481626542ade93dfe98dfb47f63aaabc6dea3e",
          "03f03b1fd786f65a4e9f4097ef76481626542ade93dfe98dfb47f63aaabc6dea4e",
          "03f03b1fd786f65a4e9f4097ef76481626542ade93dfe98dfb47f63aaabc6dea5e",
          "03f03b1fd786f65a4e9f4097ef76481626542ade93dfe98dfb47f63aaabc6dea6e",
          "03f03b1fd786f65a4e9f4097ef76481626542ade93dfe98dfb47f63aaabc6dea7e",
          "03f03b1fd786f65a4e9f4097ef76481626542ade93dfe98dfb47f63aaabc6dea8e",
          "03f03b1fd786f65a4e9f4097ef76481626542ade93dfe98dfb47f63aaabc6dea9e",
          "03f03b1fd786f65a4e9f4097ef76481626542ade93dfe98dfb47f63aaabc6deaa0e"
        ]
      }
    }

    const result = await server.executeOperation({ query, variables })

    expect(result.errors[0].message).toEqual("Argument Validation Error")
    expect(mockedWalletServiceGeneratedAddress).not.toHaveBeenCalled()
  })

  it("should pass with custom params into WalletService.getMultiSigP2SHAddress", async () => {
    Container.set({ id: WalletResolver, type: WalletResolver })
    Container.set(WalletService, { getMultiSigP2SHAddress: jest.fn() })

    const walletService = Container.get(WalletService)

    const mockedAddressEntity = AddressEntity.fromObject({
      address: "3QV15CiGL9bMzkBjVc4686n4u25XPacycu",
      redeemScriptsHexDecimal:
        "522102ca23646d58bec31302312797835825ae7e72acd7d6408a89548b237ef4b35a4c2102d2300555d518fea61e80fbc3cfedfccf8f397b7eb32f72cc82753a371c5e5db32103466cc8b0f7e4a2b46d01697aad64710f38997f60ce75c28daf6fec8a52fd18ef2103f03b1fd786f65a4e9f4097ef76481626542ade93dfe98dfb47f63aaabc6dea1e54ae"
    })

    const mockedWalletServiceGeneratedAddress = jest
      .spyOn(walletService, "getMultiSigP2SHAddress")
      .mockResolvedValue(mockedAddressEntity)

    const query = `
        query WalletGetMultiSigP2SHAddress($input: WalletGetMultiSigP2SHAddressDto!) {
            WalletGetMultiSigP2SHAddress(input: $input) {
                address
                redeemScriptsHexDecimal
            }
        }
    `
    const variables = {
      input: {
        m: 2,
        publicKeys: [
          "02ca23646d58bec31302312797835825ae7e72acd7d6408a89548b237ef4b35a4c",
          "02d2300555d518fea61e80fbc3cfedfccf8f397b7eb32f72cc82753a371c5e5db3",
          "02d2300555d518fea61e80fbc3cfedfccf8f397b7eb32f72cc82753a371c5e5db4",
          "03466cc8b0f7e4a2b46d01697aad64710f38997f60ce75c28daf6fec8a52fd18ef"
        ]
      }
    }

    const result = await server.executeOperation({ query, variables })

    expect(result?.data.WalletGetMultiSigP2SHAddress).toEqual({
      address: "3QV15CiGL9bMzkBjVc4686n4u25XPacycu",
      redeemScriptsHexDecimal:
        "522102ca23646d58bec31302312797835825ae7e72acd7d6408a89548b237ef4b35a4c2102d2300555d518fea61e80fbc3cfedfccf8f397b7eb32f72cc82753a371c5e5db32103466cc8b0f7e4a2b46d01697aad64710f38997f60ce75c28daf6fec8a52fd18ef2103f03b1fd786f65a4e9f4097ef76481626542ade93dfe98dfb47f63aaabc6dea1e54ae"
    })

    expect(mockedWalletServiceGeneratedAddress).toHaveBeenCalledWith(
      GetMultiSigP2SHAddressDto.fromObject({
        m: 2,
        publicKeys: [
          "02ca23646d58bec31302312797835825ae7e72acd7d6408a89548b237ef4b35a4c",
          "02d2300555d518fea61e80fbc3cfedfccf8f397b7eb32f72cc82753a371c5e5db3",
          "02d2300555d518fea61e80fbc3cfedfccf8f397b7eb32f72cc82753a371c5e5db4",
          "03466cc8b0f7e4a2b46d01697aad64710f38997f60ce75c28daf6fec8a52fd18ef"
        ]
      })
    )
  })
})
