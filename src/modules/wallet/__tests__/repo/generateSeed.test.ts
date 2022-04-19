import * as bip39 from "bip39"
import crypto from "crypto"
import Container from "typedi"

import { getWordList } from "../../../../utils/wordlist"
import { ISeed } from "../../wallet.interface"
import { WalletRepo } from "../../wallet.repo"

describe("WalletRepo.generateSeed", () => {
  it("should pass correct params along the call stack", async () => {
    Container.set({ id: WalletRepo, type: WalletRepo })
    Container.set("network", {})

    const walletRepo = Container.get(WalletRepo)

    const mockedGenerateMnemonic = jest
      .spyOn(bip39, "generateMnemonic")
      .mockReturnValue(
        "purse brief original title elbow build focus south recipe sphere edge emotion comfort exact dress great wife glide perfect coin nephew pelican task head"
      )

    const mockedMnemonicToSeedSync = jest
      .spyOn(bip39, "mnemonicToSeedSync")
      .mockReturnValue(
        Buffer.from(
          "e1e9d8564d3a48b0f4225163bc4411a3824d57e619e9862bf3a83deff4d556a68586bafdd3f811e43e6bcff5c7c955f07fb65eee1445e710bf1d8438b1d8807a",
          "hex"
        )
      )

    const seedObj: ISeed = walletRepo.generateSeed({
      password: null,
      length: 12,
      language: "english"
    })

    expect(mockedGenerateMnemonic).toHaveBeenCalledWith((12 / 3) * 32, crypto.randomBytes, getWordList("ENGLISH"))
    expect(mockedMnemonicToSeedSync).toHaveBeenCalledWith(
      "purse brief original title elbow build focus south recipe sphere edge emotion comfort exact dress great wife glide perfect coin nephew pelican task head",
      null
    )
    expect(seedObj).toEqual({
      mnemonic:
        "purse brief original title elbow build focus south recipe sphere edge emotion comfort exact dress great wife glide perfect coin nephew pelican task head",
      seed: "e1e9d8564d3a48b0f4225163bc4411a3824d57e619e9862bf3a83deff4d556a68586bafdd3f811e43e6bcff5c7c955f07fb65eee1445e710bf1d8438b1d8807a"
    })
  })
})
