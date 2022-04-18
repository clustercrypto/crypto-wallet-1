import BIP32Factory from "bip32"
import { mnemonicToSeedSync } from "bip39"
import { Network, payments } from "bitcoinjs-lib"
import * as ecc from "tiny-secp256k1"
import { Inject, Service } from "typedi"

import { NETWORK } from "../../../enum"

interface IGetHDSegwitAddress {
  seed: string
  path: string
  network: string
  password: string
}

interface IAddress {
  address: string
  privateKey: string
  publicKey: string
}

@Service()
export class WalletRepo {
  @Inject("network")
  network: Record<NETWORK, Network>

  getHDSegwitAddressBySeedAndPath(param: IGetHDSegwitAddress): IAddress {
    const { seed: phrase, path, password, network: networkKey } = param
    const seed = mnemonicToSeedSync(phrase, password)

    // generate master keys
    const bip32 = BIP32Factory(ecc)

    const master = bip32.fromSeed(seed, this.network[networkKey])

    const extended = master.derivePath(path)
    const extendedPrivateKey = extended.toBase58()
    const extendedPublicKey = extended.neutered().toBase58()

    // default as p2wpkh
    let address: string = payments.p2wpkh({ pubkey: extended.publicKey, network: this.network[networkKey] }).address

    if (networkKey === NETWORK.BITCOIN_P2WSH) {
      address = payments.p2wsh({ pubkey: extended.publicKey, network: this.network[networkKey] }).address
    }

    return {
      privateKey: extendedPrivateKey,
      publicKey: extendedPublicKey,
      address
    }
  }
}
