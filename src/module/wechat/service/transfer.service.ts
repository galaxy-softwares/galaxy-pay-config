import { Injectable } from '@nestjs/common'
import { WechatConfig } from '../interfaces'
import {
  WeChatQueryTransferReqParam,
  WeChatQueryTransferRes,
  WeChatTransferReqParam,
  WeChatTransferRes
} from '../interfaces'
import { WeChatPayBaseService } from './base.service'

/**
 * 微信支付-企业付款
 */
@Injectable()
export class WeChatTransferService extends WeChatPayBaseService {
  /** API 接口域名 */
  private readonly redpackApiBase = 'https://api.mch.weixin.qq.com'
  /** 企业付款到零钱接口地址 */
  private readonly transferUrl = `${this.redpackApiBase}/mmpaymkttransfers/promotion/transfers`
  /** 查询企业付款到零钱接口地址 */
  private readonly queryTransferUrl = `${this.redpackApiBase}/mmpaymkttransfers/gettransferinfo`

  /**
   * 企业付款到零钱
   *
   * @param params 企业付款到零钱接口请求参数
   */
  async transfer(params: WeChatTransferReqParam, wechat_config: WechatConfig): Promise<WeChatTransferRes> {
    params.mch_appid = wechat_config.appid
    params.mchid = wechat_config.mch_id
    ;(params as any).sign_type = 'MD5'
    return await this.requestUtil.post<WeChatTransferRes>(
      this.transferUrl,
      this.processParams(params, wechat_config),
      wechat_config.mch_key,
      { httpsAgent: this.getCertHttpAgent(wechat_config.apiclient_cert, wechat_config.mch_id) }
    )
  }

  /**
   * 查询企业付款到零钱
   *
   * @param params 查询企业付款到零钱接口请求参数
   */
  async queryTransfer(
    params: WeChatQueryTransferReqParam,
    wechat_config: WechatConfig
  ): Promise<WeChatQueryTransferRes> {
    ;(params as any).sign_type = 'MD5'
    return await this.requestUtil.post<WeChatQueryTransferRes>(
      this.queryTransferUrl,
      this.processParams(params, wechat_config),
      wechat_config.mch_key,
      { httpsAgent: this.getCertHttpAgent(wechat_config.apiclient_cert, wechat_config.mch_id) }
    )
  }
}
