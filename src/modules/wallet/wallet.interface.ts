export interface IGetHDSegwitAddress {
  seed: string
  path: string
  network: string
  password: string
}

export interface IGetMultiSigP2SHAddress {
  m: number
  publicKeys: Buffer[]
}
export interface IAddress {
  address: string
  privateKey?: string
  publicKey?: string
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
