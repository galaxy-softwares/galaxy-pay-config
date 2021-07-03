import { Injectable } from '@nestjs/common'

import { WechatConfig, WeChatMicroPayOrderReqParam, WeChatMicroPayOrderRes } from '../interfaces'
import { WeChatPayBaseService } from './base.service'

/**
 * 微信支付-付款码支付类
 */
@Injectable()
export class WeChatMicroPayService extends WeChatPayBaseService {
  /**
   * 付款码支付
   * @param params
   * @param wechat_config
   */
  async pay(params: WeChatMicroPayOrderReqParam, wechat_config: WechatConfig) {
    return await this.requestUtil.post<WeChatMicroPayOrderRes>(
      this.micropayUrl,
      this.processParams(params, wechat_config),
      wechat_config.mch_key
    )
  }

  /**
   * 撤销订单
   *
   * @param params 撤销订单接口请求参数
   */
  // async closeOrder(params: WeChatMicroPayReverseOrderReqParam): Promise<WeChatMicroPayReverseOrderRes> {
  //     const url = `${this.apiBase}/pay/reverse`;
  //     return await this.requestUtil.post<WeChatMicroPayReverseOrderRes>(url, params, { httpsAgent: this.certificateAgent });
  // }
}
