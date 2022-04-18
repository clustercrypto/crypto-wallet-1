import { Arg, Query, Resolver } from "type-graphql"
import { Inject, Service } from "typedi"

import { Trace } from "../../../utils/logger/trace.util"
import { AddressEntity } from "../entity/address.entity"
import { WalletService } from "../service/wallet.service"
import { GetHDSegWitAddressDto } from "./getHDSegWitAddress.dto"

@Trace({ perf: true, logInput: { enabled: true, beautify: true } })
@Service()
@Resolver()
export class WalletResolver {
  @Inject()
  walletService: WalletService

  @Query(() => AddressEntity, { nullable: true, name: "WalletGetHDSegWitAddress" })
  async getHDSegWitAddress(@Arg("input") input: GetHDSegWitAddressDto): Promise<AddressEntity> {
    const validatedDto = GetHDSegWitAddressDto.fromObject<GetHDSegWitAddressDto>(input)
    return this.walletService.getHDSegWitAddressBySeedAndPath(validatedDto)
  }
}
