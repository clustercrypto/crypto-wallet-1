import { Arg, Query, Resolver } from "type-graphql"
import { Inject, Service } from "typedi"

import { Trace } from "../../../utils/logger/trace.util"
import { GetHDSegWitAddressDto } from "../dto/getHDSegWitAddress.dto"
import { GetMultiSigP2SHAddressDto } from "../dto/getMultiSigP2SHAddress.dto"
import { AddressEntity } from "../entity/address.entity"
import { WalletService } from "../service/wallet.service"

@Trace({ perf: true, logInput: { enabled: true, beautify: true } })
@Service()
@Resolver()
export class WalletResolver {
  @Inject()
  walletService: WalletService

  @Query(() => AddressEntity, {
    name: "WalletGetHDSegWitAddress",
    description: "Generate one HD Segwit Address given client seed and path"
  })
  async getHDSegWitAddress(@Arg("input") input: GetHDSegWitAddressDto): Promise<AddressEntity> {
    const validatedDto = GetHDSegWitAddressDto.fromObject<GetHDSegWitAddressDto>(input)
    return this.walletService.getHDSegWitAddressBySeedAndPath(validatedDto)
  }

  @Query(() => AddressEntity, {
    name: "WalletGetMultiSigP2SHAddress",
    description: "Generate one NMP2SH Address given client seed and path"
  })
  async getMultiSigP2SHAddress(@Arg("input") input: GetMultiSigP2SHAddressDto): Promise<AddressEntity> {
    const validatedDto = GetMultiSigP2SHAddressDto.fromObject<GetMultiSigP2SHAddressDto>(input)
    return this.walletService.getMultiSigP2SHAddress(validatedDto)
  }
}
