import { Injectable } from '@nestjs/common'

import { WechatConfig, WeChatOtherPayOrderReqParam, WeChatOtherPayOrderRes } from '../interfaces'
import { WeChatPayBaseService } from './base.service'

/**
 * 微信支付-Native支付类
 */
@Injectable()
export class WeChatNativePayService extends WeChatPayBaseService {
  /**
   * 扫码支付
   *
   * @param params 扫码支付接口请求参数
   * @param wechat_config 微信支付配置
   */
  async pay(params: WeChatOtherPayOrderReqParam, wechat_config: WechatConfig): Promise<WeChatOtherPayOrderRes> {
    return await this.requestUtil.post<WeChatOtherPayOrderRes>(
      this.unifiedOrderUrl,
      this.processParams(params, wechat_config),
      wechat_config.mch_key
    )
  }
}
