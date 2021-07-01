import { Injectable } from '@nestjs/common'
import {
  WeChatAppPayOrderReqParam,
  WeChatAppPayOrderRes,
  WeChatBaseCloseOrderReqParam,
  WeChatBaseCloseOrderRes,
  WeChatBaseQueryOrderReqParam,
  WeChatBaseQueryOrderRes
} from '../interfaces/order.interface'
import { WeChatBaseQueryRefundReqParam, WeChatBaseQueryRefundRes } from '../interfaces/refund.interface'
import { WeChatPayBaseService } from './base.service'
import { WechatConfig } from '../interfaces/base.interface'

/**
 * 微信支付-APP支付类
 */
@Injectable()
export class WeChatAppPayService extends WeChatPayBaseService {
  /**
   * APP支付
   *
   * @param params APP支付请求参数
   */
  async pay(params: WeChatAppPayOrderReqParam, wechat_config: WechatConfig): Promise<any> {
    const result = await this.requestUtil.post<WeChatAppPayOrderRes>(
      this.unifiedOrderUrl,
      this.processParams(params, wechat_config),
      wechat_config.mch_key
    )
    if (result.return_code !== 'SUCCESS') {
      throw new Error(result.return_msg)
    }
    // 请求微信服务器之后，返回的参数还需要再做一次加密
    const data = {
      appid: result.appid,
      partnerid: result.mch_id,
      prepayid: result.prepay_id,
      package: 'Sign=WXPay',
      noncestr: result.nonce_str,
      timestamp: Date.parse(new Date().toString()) / 1000
    }
    return { ...data, ...{ sign: this.signUtil.sign(data, wechat_config.mch_key) } }
  }

  /**
   * APP查询订单
   *
   * @param params APP查询订单请求参数
   */
  async queryOrder(
    params: WeChatBaseQueryOrderReqParam,
    wechat_config: WechatConfig
  ): Promise<WeChatBaseQueryOrderRes> {
    ;(params as any).sign_type = 'no_sign_type'
    return await super.queryOrder(params, wechat_config)
  }

  /**
   * APP关闭订单
   *
   * @param params APP关闭订单请求参数
   */
  async closeOrder(
    params: WeChatBaseCloseOrderReqParam,
    wechat_config: WechatConfig
  ): Promise<WeChatBaseCloseOrderRes> {
    ;(params as any).sign_type = 'no_sign_type'
    return await super.closeOrder(params, wechat_config)
  }

  /**
   * APP查询退款
   *
   * @param params APP查询退款请求参数
   */
  async queryRefund(
    params: WeChatBaseQueryRefundReqParam,
    wechat_config: WechatConfig
  ): Promise<WeChatBaseQueryRefundRes> {
    ;(params as any).sign_type = 'no_sign_type'
    return await super.queryRefund(params, wechat_config)
  }
}
