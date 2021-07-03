import { Injectable, Inject } from '@nestjs/common'
import { WeChatRequestUtil } from '../utils/request.util'
import * as fs from 'fs'
import * as https from 'https'
import { WeChatSignUtil } from '../utils/sign.util'
import { RandomUtil } from '../utils/random.util'
import {
  WechatConfig,
  WeChatDownloadBillParam,
  WeChatDownloadBillRes,
  WechatDownloadFundFlowParam,
  WechatDownloadFundFlowRes,
  WeChatBaseQueryRefundRes,
  WeChatBaseQueryRefundReqParam,
  WeChatBaseRefundReqParam,
  WeChatBaseRefundRes,
  WeChatBaseCloseOrderReqParam,
  WeChatBaseCloseOrderRes,
  WeChatBaseQueryOrderReqParam,
  WeChatBaseQueryOrderRes
} from '../interfaces'

@Injectable()
export class WeChatPayBaseService {
  protected apiBase = 'https://api.mch.weixin.qq.com'
  /** 统一下单接口地址 */
  protected readonly unifiedOrderUrl = `${this.apiBase}/pay/unifiedorder`
  /** 查询订单接口地址 */
  protected readonly queryOrderUrl = `${this.apiBase}/pay/orderquery`
  /** 关闭订单接口地址 */
  protected readonly closeOrderUrl = `${this.apiBase}/pay/closeorder`
  /** 申请退款接口地址 */
  protected readonly refundUrl = `${this.apiBase}/secapi/pay/refund`
  /** 查询退款接口地址 */
  protected readonly refundQueryUrl = `${this.apiBase}/pay/refundquery`
  /** 下载对账单接口地址 */
  protected readonly downloadBillUrl = `${this.apiBase}/pay/downloadbill`
  /** 下载资金账单接口地址 */
  protected readonly downloadFundFlowUrl = `${this.apiBase}/pay/downloadfundflow`
  /** 微信扫码付款接口地址 */
  protected readonly micropayUrl = `${this.apiBase}/pay/micropay`

  constructor(
    @Inject(WeChatRequestUtil) protected readonly requestUtil: WeChatRequestUtil,
    @Inject(WeChatSignUtil) protected readonly signUtil: WeChatSignUtil,
    @Inject(RandomUtil) private readonly randomUtil: RandomUtil
  ) {}

  /**
   * 查询订单
   *
   * @param params 查询订单请求参数
   */
  public async queryOrder(
    params: WeChatBaseQueryOrderReqParam,
    wechat_config: WechatConfig
  ): Promise<WeChatBaseQueryOrderRes> {
    if (!params.out_trade_no && !params.transaction_id) {
      throw new Error('参数有误，out_trade_no 和 transaction_id 二选一')
    }
    return await this.requestUtil.post<WeChatBaseQueryOrderRes>(
      this.queryOrderUrl,
      this.processParams(params, wechat_config),
      wechat_config.mch_key
    )
  }

  /**
   * 关闭订单
   *
   * @param params 关闭订单请求参数
   */
  public async closeOrder(
    params: WeChatBaseCloseOrderReqParam,
    wechat_config: WechatConfig
  ): Promise<WeChatBaseCloseOrderRes> {
    return await this.requestUtil.post<WeChatBaseCloseOrderRes>(
      this.closeOrderUrl,
      this.processParams(params, wechat_config),
      wechat_config.mch_key
    )
  }

  /**
   * 申请退款
   *
   * @param params 申请退款请求参数
   */
  public async refund(params: WeChatBaseRefundReqParam, wechat_config: WechatConfig): Promise<WeChatBaseRefundRes> {
    if (!params.out_trade_no && !params.transaction_id)
      throw new Error('参数有误，out_trade_no 和 transaction_id 二选一')
    return await this.requestUtil.post<WeChatBaseRefundRes>(
      this.refundUrl,
      this.processParams(params, wechat_config),
      wechat_config.mch_key,
      { httpsAgent: this.getCertHttpAgent(wechat_config.apiclient_cert, wechat_config.mch_id) }
    )
  }

  /**
   * 微信交易账单下载（接口暂未实现流接收）
   * @param params WeChatDownloadBillParam
   * @param wechat_config WechatConfig
   */
  public async downloadBill(
    params: WeChatDownloadBillParam,
    wechat_config: WechatConfig
  ): Promise<WeChatDownloadBillRes> {
    return await this.requestUtil.post<WeChatDownloadBillRes>(
      this.downloadBillUrl,
      this.processParams(params, wechat_config),
      wechat_config.mch_key
    )
  }

  /**
   * 微信资金账单下载 （接口暂未实现流接收）
   * @param params WechatDownloadFundFlowParam
   * @param wechat_config WechatConfig
   */
  public async downloadFundFlow(
    params: WechatDownloadFundFlowParam,
    wechat_config: WechatConfig
  ): Promise<WechatDownloadFundFlowRes> {
    return await this.requestUtil.post<WechatDownloadFundFlowRes>(
      this.downloadFundFlowUrl,
      this.processParams(params, wechat_config),
      wechat_config.mch_key,
      { httpsAgent: this.getCertHttpAgent(wechat_config.apiclient_cert, wechat_config.mch_id) }
    )
  }

  /**
   * 查询退款
   *
   * @param params 查询退款请求参数
   */
  public async queryRefund(
    params: WeChatBaseQueryRefundReqParam,
    wechat_config: WechatConfig
  ): Promise<WeChatBaseQueryRefundRes> {
    if (!params.out_trade_no && !params.transaction_id && !params.out_refund_no && !params.refund_id) {
      throw new Error('参数有误，out_trade_no、transaction_id、out_refund_no 和 refund_id 四选一')
    }
    return await this.requestUtil.post<WeChatBaseQueryRefundRes>(
      this.refundQueryUrl,
      this.processParams(params, wechat_config),
      wechat_config.mch_key
    )
  }

  /**
   * 微信支付参数拼接
   * @param params 微信支付参数
   * @param config 微信支付配置
   */
  processParams(params: { [k: string]: string | number | any }, config: WechatConfig) {
    params.notify_url = config.notify_url
    params.appid = config.appid
    params.mch_id = config.mch_id
    params.nonce_str = this.randomUtil.genRandomStr()
    params.sign_type = params.sign_type === 'HMAC-SHA256' ? 'HMAC-SHA256' : 'MD5'
    params.sign = this.signUtil.sign(params, config.mch_key, params.sign_type)
    return params
  }

  /**
   * 获取微信证书
   * @param apiclient_cert string
   * @param mch_id string
   */
  getCertHttpAgent(apiclient_cert: string | Buffer, mch_id: string): https.Agent {
    if (!apiclient_cert) {
      throw new Error('参数有误，微信退款接口证书未传递！')
    }
    return new https.Agent({
      pfx: Buffer.isBuffer(apiclient_cert) ? apiclient_cert : fs.readFileSync(apiclient_cert),
      passphrase: mch_id
    })
  }
}
