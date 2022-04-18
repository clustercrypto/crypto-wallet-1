import { Arg, Query, Resolver } from "type-graphql"
import { Inject, Service } from "typedi"

import { Trace } from "../../../utils/logger/trace.util"
import { GetHDSegWitAddressDto } from "../dto/getHDSegWitAddress.dto"
import { AddressEntity } from "../entity/address.entity"
import { WalletService } from "../service/wallet.service"

@Trace({ perf: true, logInput: { enabled: true, beautify: true } })
@Service()
@Resolver()
export class WalletResolver {
  @Inject()
  walletService: WalletService

  @Query(() => AddressEntity, {
    nullable: true,
    name: "WalletGetHDSegWitAddress",
    description: "Generate one HD Segwit Address given client seed and path"
  })
  async getHDSegWitAddress(@Arg("input") input: GetHDSegWitAddressDto): Promise<AddressEntity> {
    const validatedDto = GetHDSegWitAddressDto.fromObject<GetHDSegWitAddressDto>(input)
    return this.walletService.getHDSegWitAddressBySeedAndPath(validatedDto)
  }
}
