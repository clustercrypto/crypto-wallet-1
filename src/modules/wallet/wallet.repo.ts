import BIP32Factory from "bip32"
import { generateMnemonic, mnemonicToSeedSync } from "bip39"
import { Network, payments } from "bitcoinjs-lib"
import crypto from "crypto"
import * as ecc from "tiny-secp256k1"
import { Inject, Service } from "typedi"

import { NETWORK } from "../../enum"
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
    // generate mnemonic words
    const mnemonic = generateMnemonic((length / 3) * 32, crypto.randomBytes, getWordList(language.toUpperCase()))
    // generate seed
    const seed = mnemonicToSeedSync(mnemonic, password).toString("hex")

    return { mnemonic, seed }
  }

  getHDSegwitAddressBySeedAndPath(param: IGetHDSegwitAddress): IAddress {
    const { seed: phrase, path, password, network: networkKey } = param
    // convert mnemonic to seed as buffer
    const seed = mnemonicToSeedSync(phrase, password)

    // generate master node
    const bip32 = BIP32Factory(ecc)
    const master = bip32.fromSeed(seed, this.network[networkKey])

    // generate the extended node given client's path
    const extended = master.derivePath(path)

    // base58 format
    const extendedPrivateKeyBase58 = extended.toBase58()
    const extendedPublicKeyBase58 = extended.neutered().toBase58()

    // hex-decimal format
    const extendedPrivateKeyHex = extended.privateKey.toString("hex")
    const extendedPublicKeyHex = extended.publicKey.toString("hex")

    // generate client address, use P2WPKH by default
    // publicKey can be generated from payment object, the value is the same.
    const payment = payments.p2wpkh({ pubkey: extended.publicKey })

    return {
      privateKeyBase58: extendedPrivateKeyBase58,
      publicKeyBase58: extendedPublicKeyBase58,
      privateKeyHexDecimal: extendedPrivateKeyHex,
      publicKeyHexDecimal: extendedPublicKeyHex,
      address: payment.address
    }
  }

  getMultiSigP2SHAddress(param: IGetMultiSigP2SHAddress): IAddress {
    const { m, publicKeys } = param

    // from string to Buffer
    const pubkeys = publicKeys.map((key) => Buffer.from(key, "hex"))

    // generate redeem script (multiple-signature)
    const redeem = payments.p2ms({ m, pubkeys })
    const redeemScriptsHexDecimal = redeem.output.toString("hex")

    // generate Pay-To-Script-Hash (P2SH) address
    const { address } = payments.p2sh({ redeem })

    return { address, redeemScriptsHexDecimal }
  }
}
