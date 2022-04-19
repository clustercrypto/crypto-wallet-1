import Container from "typedi"

import { IAddress } from "../../wallet.interface"
import { WalletRepo } from "../../wallet.repo"

describe("WalletRepo.getHDSegwitAddressBySeedAndPath", () => {
  it("should work as expected", async () => {
    Container.set({ id: WalletRepo, type: WalletRepo })
    Container.set("network", {
      bitcoin_p2wpkh: {
        messagePrefix: "\x18BitCore Signed Message:\n",
        bech32: "bitcore",
        bip32: {
          public: 0x0488b21e,
          private: 0x0488ade4
        },
        pubKeyHash: 0x03,
        scriptHash: 0x7d,
        wif: 0x80
      }
    })

    const walletRepo = Container.get(WalletRepo)

    const addressObj: IAddress = walletRepo.getHDSegwitAddressBySeedAndPath({
      seed: "purse brief original title elbow build focus south recipe sphere edge emotion comfort exact dress great wife glide perfect coin nephew pelican task head",
      path: "m/84'/0'/0'/0/0",
      network: "bitcoin_p2wpkh",
      password: ""
    })

    expect(addressObj).toEqual({
      address: "bc1q5z4qw5e3dywwlc0pl00u4ws99m9j6kyeqfpypj",
      privateKeyBase58:
        "xprvA3Fb78RKqhaZJ61XpEY6Z12w3FDdaefizPPhAT8frHDyivQSdo2pcXFeFpeoLV9fNSN5wGr5pvnv6hfJyUf5YJ8se6kkP7XqCfq7qNYFpGk",
      privateKeyHexDecimal: "973c53659c89a3f8eccbe69f2d1885b6ff9687be69384ab0e7244c14bc5883cc",
      publicKeyBase58:
        "xpub6GEwWdxDg58rWa5zvG56v8yfbH47z7PaMcKHxqYHQckxbijbBLM5AKa874ZNgr1gvYtuTW5aPZusG5hQz9QEocupt3bM53CHC6MHP8T5L2q",
      publicKeyHexDecimal: "02033603ecf6191a1c9ffc87a677a63960d8f94ebea68a72788a98e957134f8f31"
    })
  })
})
