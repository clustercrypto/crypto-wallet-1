import { Inject, Service } from "typedi"

import { Trace } from "../../utils/logger/trace.util"
import { AddressEntity } from "./address.entity"
import { GetHDSegWitAddressDto } from "./dto/getHDSegWitAddress.dto"
import { GetMultiSigP2SHAddressDto } from "./dto/getMultiSigP2SHAddress.dto"
import { WalletRepo } from "./wallet.repo"

@Trace({ perf: true, logInput: { enabled: true, beautify: true } })
@Service()
export class WalletService {
  @Inject()
  walletRepo: WalletRepo

  async getHDSegWitAddressBySeedAndPath(getHDSegWitAddressDto: GetHDSegWitAddressDto): Promise<AddressEntity> {
    const addressObj = this.walletRepo.getHDSegwitAddressBySeedAndPath(getHDSegWitAddressDto)
    return AddressEntity.fromObject(addressObj)
  }

  async getMultiSigP2SHAddress(getMultiSigP2SHAddressDto: GetMultiSigP2SHAddressDto): Promise<AddressEntity> {
    const addressObj = this.walletRepo.getMultiSigP2SHAddress(getMultiSigP2SHAddressDto)
    return AddressEntity.fromObject(addressObj)
  }
}
