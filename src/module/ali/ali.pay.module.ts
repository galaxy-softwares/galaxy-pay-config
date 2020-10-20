import { Module, HttpModule } from '@nestjs/common';
import { AliWapPayService } from './service/wap.pay.service';
import { AliParamsUtil } from './utils/params.util';
import { AliRequestUtil } from './utils/request.util';
import { AliSignUtil } from './utils/sign.util';
import { AliAppPayService } from './service/app.pay.service';
import { AliPagePayService } from './service/page.pay.service';
import { AliTradePayService } from './service/trade.pay.service';

@Module({
  imports: [HttpModule],
  controllers: [],
  providers: [
    AliPagePayService,
    AliAppPayService,
    AliParamsUtil,
    AliRequestUtil,
    AliSignUtil,
    AliWapPayService,
    AliTradePayService,
  ],
  exports: [
    AliPagePayService,
    AliAppPayService,
    AliParamsUtil,
    AliRequestUtil,
    AliSignUtil,
    AliTradePayService,
    AliWapPayService,
  ],
})
export class AliPayModule {}
