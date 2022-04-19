export interface IGetHDSegwitAddress {
  seed: string
  path: string
  network: string
  password: string
}

export interface IGetMultiSigP2SHAddress {
  m: number
  publicKeys: string[]
}
export interface IAddress {
  address: string
  privateKeyBase58?: string
  publicKeyBase58?: string
  privateKeyHexDecimal?: string
  publicKeyHexDecimal?: string
  redeemScriptsHexDecimal?: string
}

export interface IGenerateSeed {
  length: number
  language: string
  password?: string
}

export interface ISeed {
  mnemonic: string
  seed: string
}
