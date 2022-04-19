
# Simple Crypto Wallet API

## Installation
```sh
git clone git@github.com:GeekEast/crypto-wallet.git
cd crypto-wallet && yarn
```

## Start Server
```sh
yarn dev
# open browser at http://localhost:9901/api/graphql
```
## Query
### Generate a seed
- graphql query
```graphql
query WalletGenerateSeed($input: WalletGenerateSeedDto!) {
  WalletGenerateSeed(input: $input) {
    mnemonic
    seed
  }
}
```
- variables
```json
{
  "input": {
    "length": 24,
    "password": "extra"
  }
}
```
- example output
```json
{
  "data": {
    "WalletGenerateSeed": {
      "mnemonic": "purse brief original title elbow build focus south recipe sphere edge emotion comfort exact dress great wife glide perfect coin nephew pelican task head",
      "seed": "e1e9d8564d3a48b0f4225163bc4411a3824d57e619e9862bf3a83deff4d556a68586bafdd3f811e43e6bcff5c7c955f07fb65eee1445e710bf1d8438b1d8807a"
    }
  }
}
```

### Generate a HD SegWit Address
- graphql query
```graphql
query WalletGetHDSegWitAddress($input: WalletGetSegWitAddressDto!) {
  WalletGetHDSegWitAddress(input: $input) {
    address
    publicKeyHexDecimal
  }
}
```
- variables
```json
{
  "input": {
    "seed": "purse brief original title elbow build focus south recipe sphere edge emotion comfort exact dress great wife glide perfect coin nephew pelican task head",
    "path": "m/84'/0'/0'/0/0",
    "password": "extra"
  }
}
```
- example output
```json
{
  "data": {
    "WalletGetHDSegWitAddress": {
      "address": "bc1q88ex0thyhzgxxfqshr2s2xft0mfn40g6vma09z",
      "publicKeyHexDecimal": "020f8e9d3cb6c94a6dfcdbabeb70bfeb2eafa7b75e9f93856edba155eb0c0ab9ae"
    }
  }
}
```
### Generate a multi-sig P2SH Address
- graphql query
```graphql
query WalletGetMultiSigP2SHAddress($input: WalletGetMultiSigP2SHAddressDto!) {
  WalletGetMultiSigP2SHAddress(input: $input) {
    address
    redeemScriptsHexDecimal
  }
}
```
- variables
```json
{
  "input": {
    "m": 2,
    "publicKeys": [
      "02ca23646d58bec31302312797835825ae7e72acd7d6408a89548b237ef4b35a4c",
      "02d2300555d518fea61e80fbc3cfedfccf8f397b7eb32f72cc82753a371c5e5db3",
      "03466cc8b0f7e4a2b46d01697aad64710f38997f60ce75c28daf6fec8a52fd18ef",
      "03f03b1fd786f65a4e9f4097ef76481626542ade93dfe98dfb47f63aaabc6dea1e"
    ]
  }
}
```
- example output
```json
{
  "data": {
    "WalletGetMultiSigP2SHAddress": {
      "address": "3QV15CiGL9bMzkBjVc4686n4u25XPacycu",
      "redeemScriptsHexDecimal": "522102ca23646d58bec31302312797835825ae7e72acd7d6408a89548b237ef4b35a4c2102d2300555d518fea61e80fbc3cfedfccf8f397b7eb32f72cc82753a371c5e5db32103466cc8b0f7e4a2b46d01697aad64710f38997f60ce75c28daf6fec8a52fd18ef2103f03b1fd786f65a4e9f4097ef76481626542ade93dfe98dfb47f63aaabc6dea1e54ae"
    }
  }
}
```
## Overview
### Correctness
- Based on the [Bitcoin Address Prefix List](https://github.com/citizen010/bitcoin-prefixes-address-list), the address for HD SegWit address generated prefixed with `bc1` and the multi-sig P2SH address generate prefixed with `3`. The basic format is confirmed to be correct.
- Based on comparison with Crypto Mobile App, the generated HD SegWit address is same to the value in App when path is `m/84'/0'/0'/0/0` using App's generated seed phrase.
- Based on the comparison with [Online Multi-Sig P2Sh tool](https://coinb.in/#newMultiSig), the result is the same given the same `m` and `publicKeys`

### Security
- In order to make the random source strong, we develop another api to generate a seed with mnemonic words, using Node.js crypto library `randomBytes` method [link here](https://nodejs.org/api/crypto.html#cryptorandombytessize-callback). If the security is required to be real random, hardware needs to be involved. (e.g [TrueRNG V3](https://www.amazon.com/TrueRNG-V3-Hardware-Random-Generator/dp/B01KR2JHTA))
- To protect HD wallet from child private key leakage, we enforce using hardened index in **account level**. e.g `m/84'/0'/0'/0/0` as the path. Attacker can use child private key (non-hardened one) with parent public key to get the parent private key. But hardened private key has its trade-off, it requires to know the parent private key to generate the child key, which weaken the segregation between private key and and public key. **In reality, the non-hardened keys are still quite secure as long as user doesn't save the child private key online.**

<p align="center"><img style="display: block; width: 600px; margin: 0 auto;" src=img/2022-04-19-14-58-26.png alt="no image found"></p>

<p align="center"><img style="display: block; width: 600px; margin: 0 auto;" src=img/2022-04-19-14-58-51.png alt="no image found"></p>

- In order to increase the security of user, they should write down the mnemonic words on paper or record in some hardware to keep it secure. Besides, they should keep private key **offline** and use it only for spending situation (for signature). For public key, they could save it online and should be used for receiving.


### Documents
- **Graphql** itself serves as a [strong-type](https://coinb.in/#newMultiSig) documentation for developer to integrate into a bigger system. I've also added extra description in graphql for client to read and understand. 
- The latest **Apollo Studio** has provided a user-friendly interface for developer to interact with the API with all options and descriptions displayed.
- Any other documents is recorded in the project `README.md` file to understand how to use this project.


### Coding
- **Dependency-Injection**: Dependency-Injection and Provider Pattern is utilized to create loosely-coupled codebase.
- **Clean Architecture**: separating `src` folder into 3-layer structure: `resolver`, `service`, `repo`
- **Validation**: DTO is used to validate input externally from API and ban any bad request as early as possible.
- **Entity** will be a good entity to convert into a **DDD** domain object in future once the business get quite large and complex. It's also the candidate place to send domain **events** for asynchronous communication in a micro-service system.
- **Utility**: Self-developed utilities are used as well. For example, the **trace** function automate logging the input into each layer and also measure the performance.
- **Code Reuse**: I have developed one class called `DTOBase` to extract common code for DTO class to do transformation, validation. Especially, developer could override `validate` method to hook some complex validation logic into DTO. e.g validate at least 2 fields should be provided.
- **Development Tools**:
  - github action is used to run unit tests and detect if the branch is not rebased from `main` branch
  - husky is used to do eslint, prettier and conventional commit check when running `git commit ...` command
  - clean git history for collaboration

### References
- [Bitcoin Address Prefix List](https://github.com/citizen010/bitcoin-prefixes-address-list)
- [Bitcoin Explorer](https://www.blockchain.com/explorer)
- [Online bitcoin cli](https://chainquery.com/)
- [Learn Bitcoin](https://learnmeabitcoin.com/)