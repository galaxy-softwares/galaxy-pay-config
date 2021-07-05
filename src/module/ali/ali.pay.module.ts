import { Module, HttpModule } from '@nestjs/common'
import { AliAppPayService, AliPagePayService, AliTradePayService, AliWapPayService } from './service'

import { AliCertUtil, AliParamsUtil, AliRequestUtil, AliSignUtil } from './utils'

@Module({
  imports: [HttpModule],
  providers: [
    AliPagePayService,
    AliAppPayService,
    AliParamsUtil,
    AliRequestUtil,
    AliSignUtil,
    AliCertUtil,
    AliWapPayService,
    AliTradePayService
  ],
  exports: [
    AliPagePayService,
    AliAppPayService,
    AliParamsUtil,
    AliRequestUtil,
    AliSignUtil,
    AliCertUtil,
    AliTradePayService,
    AliWapPayService
  ]
})
export class AliPayModule {}
