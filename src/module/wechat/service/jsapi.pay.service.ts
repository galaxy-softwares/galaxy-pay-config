import { Injectable } from '@nestjs/common'
import { WeChatOtherPayOrderReqParam, WeChatOtherPayOrderRes } from '../interfaces/order.interface'
import { WeChatPayBaseService } from './base.service'
import { WechatConfig } from '../interfaces/base.interface'

/**
 * 微信支付-JSAPI支付类
 */
@Injectable()
export class WeChatJSAPIPayService extends WeChatPayBaseService {
  /**
   * JSAPI支付
   * @param wechat_config 微信配置
   * @param params JSAPI支付接口请求参数
   */
  async pay(params: WeChatOtherPayOrderReqParam, wechat_config: WechatConfig): Promise<WeChatOtherPayOrderRes> {
    return await this.requestUtil.post<WeChatOtherPayOrderRes>(
      this.unifiedOrderUrl,
      this.processParams(params, wechat_config),
      wechat_config.mch_key
    )
  }
}
