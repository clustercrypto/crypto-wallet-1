
### Query
```graphql
query WalletGetHDSegWitAddress($input: WalletGetSegWitAddressDto!) {
  WalletGetHDSegWitAddress(input: $input) {
    address
  }
}

query WalletGetMultiSigP2SHAddress($input: WalletGetMultiSigP2SHAddressDto!) {
  WalletGetMultiSigP2SHAddress(input: $input) {
    address
  }
}
```
```json
{
  "input": {
    "seed": "orchard baby toast token ice slush damage weasel forest venture pottery tired crawl flame service embrace whisper column effort drop claw giggle salmon mail",
    "path": "m/84'/0'/0'/0/0"
  }
}

{
  "input": {
    "m": 2,
    "publicKeys": [
      "026477115981fe981a6918a6297d9803c4dc04f328f22041bedff886bbc2962e01",
      "02c96db2302d19b43d4c69368babace7854cc84eb9e061cde51cfa77ca4a22b8b9",
      "03c6103b3b83e4a24a0e33a4df246ef11772f9992663db0c35759a5e2ebf68d8e9",
    ]
  }
}
```

### Commands
|          Action          | Command    |
| :----------------------: | ---------- |
| **start server locally** | `yarn dev` |

### Links
| Environment | URL                               |
| ----------- | --------------------------------- |
| Local       | http://localhost:9901/api/graphql |