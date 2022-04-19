import { Container } from "typedi"

import { GetHDSegWitAddressDto } from "../../dto/getHDSegWitAddress.dto"
import { AddressEntity } from "../../entity/address.entity"
import { IAddress } from "../../wallet.interface"
import { WalletRepo } from "../../wallet.repo"
import { WalletService } from "../../wallet.service"

describe("WalletService.getHDSegWitAddressBySeedAndPath", () => {
  it("should pass correct params into WalletRepo.getHDSegwitAddressBySeedAndPath", async () => {
    Container.set({ id: WalletService, type: WalletService })
    Container.set(WalletRepo, { getHDSegwitAddressBySeedAndPath: jest.fn() })

    const walletService = Container.get(WalletService)
    const walletRepo = Container.get(WalletRepo)

    const mockedGeneratedSeedRes: IAddress = {
      address: "bc1q88ex0thyhzgxxfqshr2s2xft0mfn40g6vma09z",
      publicKeyHexDecimal: "020f8e9d3cb6c94a6dfcdbabeb70bfeb2eafa7b75e9f93856edba155eb0c0ab9ae"
    }
    const mockedGeneratedSeed = jest
      .spyOn(walletRepo, "getHDSegwitAddressBySeedAndPath")
      .mockReturnValue(mockedGeneratedSeedRes)

    const generatedSeed = await walletService.getHDSegWitAddressBySeedAndPath(
      GetHDSegWitAddressDto.fromObject({
        seed: "purse brief original title elbow build focus south recipe sphere edge emotion comfort exact dress great wife glide perfect coin nephew pelican task head",
        path: "m/84'/0'/0'/0/0",
        password: "password",
        network: "bitcoin_p2wpkh"
      })
    )

    expect(generatedSeed).toEqual(
      AddressEntity.fromObject({
        address: "bc1q88ex0thyhzgxxfqshr2s2xft0mfn40g6vma09z",
        publicKeyHexDecimal: "020f8e9d3cb6c94a6dfcdbabeb70bfeb2eafa7b75e9f93856edba155eb0c0ab9ae"
      })
    )
    expect(mockedGeneratedSeed).toHaveBeenCalledWith({
      seed: "purse brief original title elbow build focus south recipe sphere edge emotion comfort exact dress great wife glide perfect coin nephew pelican task head",
      path: "m/84'/0'/0'/0/0",
      password: "password",
      network: "bitcoin_p2wpkh"
    })
  })
})
