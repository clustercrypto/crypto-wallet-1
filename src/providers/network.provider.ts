import { Container } from "typedi"

export class NetworkProvider {
  static async provide() {
    if (Container.has("network")) return

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
      },
      bitcoin_p2wsh: {
        messagePrefix: "\x18Bitcoin Signed Message:\n",
        bech32: "bc",
        bip32: {
          public: 0x02aa7ed3,
          private: 0x02aa7a99
        },
        pubKeyHash: 0x00,
        scriptHash: 0x05,
        wif: 0x80
      }
    })
  }
}
