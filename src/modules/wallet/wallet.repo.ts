import BIP32Factory from "bip32"
import { generateMnemonic, mnemonicToSeedSync } from "bip39"
import { Network, payments } from "bitcoinjs-lib"
import crypto from "crypto"
import * as ecc from "tiny-secp256k1"
import { Inject, Service } from "typedi"

import { NETWORK } from "../../enum"
import { Logger } from "../../utils/logger/logger.util"
import { Trace } from "../../utils/logger/trace.util"
import { getWordList } from "../../utils/wordlist"
import { IAddress, IGenerateSeed, IGetHDSegwitAddress, IGetMultiSigP2SHAddress, ISeed } from "./wallet.interface"

@Service()
@Trace({ perf: true, logInput: { enabled: true, beautify: true } })
export class WalletRepo {
  @Inject("network")
  network: Record<NETWORK, Network>

  generateSeed(generateSeed: IGenerateSeed): ISeed {
    const { length, language, password } = generateSeed
    const mnemonic = generateMnemonic((length / 3) * 32, crypto.randomBytes, getWordList(language.toUpperCase()))
    Logger.warn(mnemonic)
    const seed = mnemonicToSeedSync(mnemonic, password).toString("hex")
    return { mnemonic, seed }
  }

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
    let address: string = payments.p2wpkh({ pubkey: extended.publicKey }).address

    if (networkKey === NETWORK.BITCOIN_P2WSH) {
      address = payments.p2wsh({ pubkey: extended.publicKey }).address
    }

    return {
      privateKey: extendedPrivateKey,
      publicKey: extendedPublicKey,
      address
    }
  }

  getMultiSigP2SHAddress(param: IGetMultiSigP2SHAddress): IAddress {
    const { m, publicKeys: pubkeys } = param
    const { address } = payments.p2sh({
      redeem: payments.p2ms({ m, pubkeys })
    })
    return { address }
  }
}
