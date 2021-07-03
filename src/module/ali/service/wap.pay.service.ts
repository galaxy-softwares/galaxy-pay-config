import { Injectable } from '@nestjs/common'
import { AliPayBaseService } from './base.service'
import { AlipayConfig, AlipayTradeWapBizContent } from '../interfaces'

@Injectable()
export class AliWapPayService extends AliPayBaseService {
  /**
   * h5 支付
   * 支付宝支付参数拼接
   * @param config AlipayConfig
   * @param body AlipayPageBizContent
   */
  pay(biz_content: AlipayTradeWapBizContent, alipay_config: AlipayConfig): string {
    return this.processParams(biz_content, 'alipay.trade.wap.pay', alipay_config)
  }
}
