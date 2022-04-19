import { Inject, Service } from "typedi"

import { Trace } from "../../utils/logger/trace.util"
import { GenerateSeedDto } from "./dto/generateSeed.dto"
import { GetHDSegWitAddressDto } from "./dto/getHDSegWitAddress.dto"
import { GetMultiSigP2SHAddressDto } from "./dto/getMultiSigP2SHAddress.dto"
import { AddressEntity } from "./entity/address.entity"
import { SeedEntity } from "./entity/seed.entity"
import { WalletRepo } from "./wallet.repo"

@Trace({ perf: true, logInput: { enabled: true, beautify: true } })
@Service()
export class WalletService {
  @Inject()
  walletRepo: WalletRepo

  async generateSeed(generateSeedDto: GenerateSeedDto): Promise<SeedEntity> {
    const seedObj = this.walletRepo.generateSeed(generateSeedDto)
    return SeedEntity.fromObject(seedObj)
  }

  async getHDSegWitAddressBySeedAndPath(getHDSegWitAddressDto: GetHDSegWitAddressDto): Promise<AddressEntity> {
    const addressObj = this.walletRepo.getHDSegwitAddressBySeedAndPath(getHDSegWitAddressDto)
    return AddressEntity.fromObject(addressObj)
  }

  async getMultiSigP2SHAddress(getMultiSigP2SHAddressDto: GetMultiSigP2SHAddressDto): Promise<AddressEntity> {
    const addressObj = this.walletRepo.getMultiSigP2SHAddress(getMultiSigP2SHAddressDto)
    return AddressEntity.fromObject(addressObj)
  }
}
