import { Container } from "typedi"

import { GetMultiSigP2SHAddressDto } from "../../dto/getMultiSigP2SHAddress.dto"
import { AddressEntity } from "../../entity/address.entity"
import { IAddress } from "../../wallet.interface"
import { WalletRepo } from "../../wallet.repo"
import { WalletService } from "../../wallet.service"

describe("WalletService.getMultiSigP2SHAddress", () => {
  it("should pass correct params into WalletRepo.getMultiSigP2SHAddress", async () => {
    Container.set({ id: WalletService, type: WalletService })
    Container.set(WalletRepo, { getMultiSigP2SHAddress: jest.fn() })

    const walletService = Container.get(WalletService)
    const walletRepo = Container.get(WalletRepo)

    const mockedGeneratedSeedRes: IAddress = {
      address: "3QV15CiGL9bMzkBjVc4686n4u25XPacycu",
      redeemScriptsHexDecimal:
        "522102ca23646d58bec31302312797835825ae7e72acd7d6408a89548b237ef4b35a4c2102d2300555d518fea61e80fbc3cfedfccf8f397b7eb32f72cc82753a371c5e5db32103466cc8b0f7e4a2b46d01697aad64710f38997f60ce75c28daf6fec8a52fd18ef2103f03b1fd786f65a4e9f4097ef76481626542ade93dfe98dfb47f63aaabc6dea1e54ae"
    }
    const mockedGeneratedSeed = jest.spyOn(walletRepo, "getMultiSigP2SHAddress").mockReturnValue(mockedGeneratedSeedRes)

    const generatedSeed = await walletService.getMultiSigP2SHAddress(
      GetMultiSigP2SHAddressDto.fromObject({
        m: 2,
        publicKeys: [
          "02ca23646d58bec31302312797835825ae7e72acd7d6408a89548b237ef4b35a4c",
          "02d2300555d518fea61e80fbc3cfedfccf8f397b7eb32f72cc82753a371c5e5db3",
          "03466cc8b0f7e4a2b46d01697aad64710f38997f60ce75c28daf6fec8a52fd18ef",
          "03f03b1fd786f65a4e9f4097ef76481626542ade93dfe98dfb47f63aaabc6dea1e"
        ]
      })
    )

    expect(generatedSeed).toEqual(
      AddressEntity.fromObject({
        address: "3QV15CiGL9bMzkBjVc4686n4u25XPacycu",
        redeemScriptsHexDecimal:
          "522102ca23646d58bec31302312797835825ae7e72acd7d6408a89548b237ef4b35a4c2102d2300555d518fea61e80fbc3cfedfccf8f397b7eb32f72cc82753a371c5e5db32103466cc8b0f7e4a2b46d01697aad64710f38997f60ce75c28daf6fec8a52fd18ef2103f03b1fd786f65a4e9f4097ef76481626542ade93dfe98dfb47f63aaabc6dea1e54ae"
      })
    )
    expect(mockedGeneratedSeed).toHaveBeenCalledWith({
      m: 2,
      publicKeys: [
        "02ca23646d58bec31302312797835825ae7e72acd7d6408a89548b237ef4b35a4c",
        "02d2300555d518fea61e80fbc3cfedfccf8f397b7eb32f72cc82753a371c5e5db3",
        "03466cc8b0f7e4a2b46d01697aad64710f38997f60ce75c28daf6fec8a52fd18ef",
        "03f03b1fd786f65a4e9f4097ef76481626542ade93dfe98dfb47f63aaabc6dea1e"
      ]
    })
  })
})
