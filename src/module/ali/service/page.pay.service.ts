import { Injectable } from '@nestjs/common'
import { AliPayBaseService } from './base.service'
import { AlipayConfig, AlipayTradePageBizContent } from '../interfaces'

@Injectable()
export class AliPagePayService extends AliPayBaseService {
  /**
   *
   * 支付宝pc支付
   * @param biz_content AlipayRequestParam
   * @param private_key srting
   */
  pay(biz_content: AlipayTradePageBizContent, alipay_cconfig: AlipayConfig): string {
    return this.processParams(biz_content, 'alipay.trade.page.pay', alipay_cconfig)
  }
}
