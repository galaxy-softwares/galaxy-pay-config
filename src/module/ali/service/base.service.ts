import { Injectable, Inject } from '@nestjs/common'
import { AliRequestUtil, AliSignUtil, AliParamsUtil } from '../utils'
import { AlipayConfig, AlipayRequestParam } from '../interfaces'
import * as moment from 'moment'

@Injectable()
export class AliPayBaseService {
  protected alipay_gate_way = 'https://openapi.alipaydev.com/gateway.do?'

  constructor(
    @Inject(AliRequestUtil) protected readonly requestUtil: AliRequestUtil,
    @Inject(AliParamsUtil) protected readonly paramsUtil: AliParamsUtil,
    @Inject(AliSignUtil) protected readonly singinUtil: AliSignUtil
  ) {}

  /**
   * 对请求参数进行组装、编码、签名，返回已组装好签名的参数字符串
   * @param biz_content 请求参数
   * @param method 支付宝支付方式
   * @param alipay_config 支付宝配置
   * @return {String}
   */
  processParams<T>(biz_content: T, method: string, alipay_config: AlipayConfig): string {
    if (!alipay_config.appid) {
      throw Error('支付宝appid 必须传递！')
    }
    if (!alipay_config.private_key) {
      throw Error('支付宝private_key 必须传递！')
    }
    if (!alipay_config.public_key) {
      throw Error('支付宝public_key 必须传递！')
    }
    const request_param: AlipayRequestParam = {
      app_id: alipay_config.appid,
      format: 'JSON',
      charset: 'utf-8',
      sign_type: 'RSA2',
      version: '1.0',
      timestamp: moment().format('YYYY-MM-DD HH:mm:ss'),
      notify_url: alipay_config.notify_url,
      return_url: alipay_config.return_url,
      method: method,
      biz_content: JSON.stringify({
        ...biz_content
      })
    }
    /**
     * 如果是证书模式，在请求的参数上加上证书
     */
    if (alipay_config.app_cert_sn && alipay_config.alipay_root_cert_sn) {
      request_param.app_cert_sn = alipay_config.app_cert_sn
      request_param.alipay_root_cert_sn = alipay_config.alipay_root_cert_sn
    }
    try {
      const { encode, unencode } = this.paramsUtil.encodeParams(request_param)
      const sign = this.singinUtil.sign(unencode, alipay_config.private_key)
      if (method === 'alipay.trade.app.pay') {
        return `${encode}&sign=` + encodeURIComponent(sign)
      } else {
        return `${this.alipay_gate_way}${encode}&sign=` + encodeURIComponent(sign)
      }
    } catch (e) {
      throw new Error(e.toString())
    }
  }
}
