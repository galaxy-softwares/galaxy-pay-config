import { Module, HttpModule } from '@nestjs/common'
import { AliWapPayService } from './service/wap.pay.service'
import { AliParamsUtil } from './utils/params.util'
import { AliRequestUtil } from './utils/request.util'
import { AliSignUtil } from './utils/sign.util'
import { AliAppPayService } from './service/app.pay.service'
import { AliPagePayService } from './service/page.pay.service'
import { AliTradePayService } from './service/trade.pay.service'
import { AliCertUtil } from './utils/cert.util'

@Module({
  imports: [HttpModule],
  controllers: [],
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
