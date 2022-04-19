import Container from "typedi"

import { IAddress } from "../../wallet.interface"
import { WalletRepo } from "../../wallet.repo"

describe("WalletRepo.getMultiSigP2SHAddress", () => {
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

    const addressObj: IAddress = walletRepo.getMultiSigP2SHAddress({
      m: 2,
      publicKeys: [
        "02ca23646d58bec31302312797835825ae7e72acd7d6408a89548b237ef4b35a4c",
        "02d2300555d518fea61e80fbc3cfedfccf8f397b7eb32f72cc82753a371c5e5db3",
        "03466cc8b0f7e4a2b46d01697aad64710f38997f60ce75c28daf6fec8a52fd18ef",
        "03f03b1fd786f65a4e9f4097ef76481626542ade93dfe98dfb47f63aaabc6dea1e"
      ]
    })

    expect(addressObj).toEqual({
      address: "3QV15CiGL9bMzkBjVc4686n4u25XPacycu",
      redeemScriptsHexDecimal:
        "522102ca23646d58bec31302312797835825ae7e72acd7d6408a89548b237ef4b35a4c2102d2300555d518fea61e80fbc3cfedfccf8f397b7eb32f72cc82753a371c5e5db32103466cc8b0f7e4a2b46d01697aad64710f38997f60ce75c28daf6fec8a52fd18ef2103f03b1fd786f65a4e9f4097ef76481626542ade93dfe98dfb47f63aaabc6dea1e54ae"
    })
  })
})
