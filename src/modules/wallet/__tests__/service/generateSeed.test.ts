import { Container } from "typedi"

import { GenerateSeedDto } from "../../dto/generateSeed.dto"
import { SeedEntity } from "../../entity/seed.entity"
import { ISeed } from "../../wallet.interface"
import { WalletRepo } from "../../wallet.repo"
import { WalletService } from "../../wallet.service"

describe("WalletService.generateSeed", () => {
  it("should pass correct params into WalletRepo.generateSeed", async () => {
    Container.set({ id: WalletService, type: WalletService })
    Container.set(WalletRepo, { generateSeed: jest.fn() })

    const walletService = Container.get(WalletService)
    const walletRepo = Container.get(WalletRepo)

    const mockedGeneratedSeedRes: ISeed = {
      mnemonic:
        "purse brief original title elbow build focus south recipe sphere edge emotion comfort exact dress great wife glide perfect coin nephew pelican task head",
      seed: "e1e9d8564d3a48b0f4225163bc4411a3824d57e619e9862bf3a83deff4d556a68586bafdd3f811e43e6bcff5c7c955f07fb65eee1445e710bf1d8438b1d8807a"
    }
    const mockedGeneratedSeed = jest.spyOn(walletRepo, "generateSeed").mockReturnValue(mockedGeneratedSeedRes)

    const generatedSeed = await walletService.generateSeed(
      GenerateSeedDto.fromObject({
        language: "english",
        password: null,
        length: 12
      })
    )

    expect(generatedSeed).toEqual(
      SeedEntity.fromObject({
        mnemonic:
          "purse brief original title elbow build focus south recipe sphere edge emotion comfort exact dress great wife glide perfect coin nephew pelican task head",
        seed: "e1e9d8564d3a48b0f4225163bc4411a3824d57e619e9862bf3a83deff4d556a68586bafdd3f811e43e6bcff5c7c955f07fb65eee1445e710bf1d8438b1d8807a"
      })
    )
    expect(mockedGeneratedSeed).toHaveBeenCalledWith({
      length: 12,
      password: null,
      language: "english"
    })
  })
})
