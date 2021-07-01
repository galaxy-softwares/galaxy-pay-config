import { HttpService, Inject, Injectable } from '@nestjs/common'
import * as axios from 'axios'
import { WeChatSignUtil } from './sign.util'
import { XmlUtil } from './xml.util'

/**
 * 微信支付接口请求工具
 */
@Injectable()
export class WeChatRequestUtil {
  constructor(
    @Inject(HttpService) private readonly httpService: HttpService,
    @Inject(XmlUtil) private readonly xmlUtil: XmlUtil,
    @Inject(WeChatSignUtil) private readonly wechatSignUtil: WeChatSignUtil
  ) {}

  /**
   * 微信支付POST请求
   *
   * @param url 请求地址
   * @param params 请求参数
   * @param config 支付参数
   */
  async post<T>(
    url: string,
    params: { [k: string]: any },
    mch_key: string,
    config?: axios.AxiosRequestConfig
  ): Promise<T> {
    const { data } = await this.httpService.post<T>(url, this.xmlUtil.convertObjToXml(params), config).toPromise()
    const result = await this.xmlUtil.parseObjFromXml<T>(data)
    const result_sign = (result as any).sign
    delete (result as any).sign
    if ((result as any).return_code === 'FAIL') {
      throw new Error((result as any).return_msg)
    }
    if ((result as any).return_code === 'SUCCESS') {
      if (result_sign !== this.wechatSignUtil.sign(result, mch_key, params.sign_type))
        throw new Error('微信支付接口返回签名有误')
    }
    return result
  }

  /**
   * 检查请求参数单号正确性
   *
   * @param params 请求参数
   */
  checkParamNo(params: { [k: string]: any }) {
    for (const no of ['out_trade_no', 'out_refund_no', 'mch_billno', 'partner_trade_no']) {
      if (Object.keys(params).includes(no)) {
        switch (no) {
          case 'out_trade_no':
            this.regexpTest(params, 'out_trade_no', 32, 'special')
            break
          case 'out_refund_no':
            this.regexpTest(params, 'out_refund_no', 64, 'special')
            break
          case 'mch_billno':
            this.regexpTest(params, 'mch_billno', 28, 'normal')
            break
          case 'partner_trade_no':
            this.regexpTest(params, 'partner_trade_no', 32, 'normal')
            break
        }
      }
    }
  }

  /**
   * 参数正则匹配校验
   *
   * @param params 参数对象
   * @param propertyName 参数属性名
   * @param maxLength 参数值最大长度
   * @param regexpType 匹配类型
   */
  regexpTest(params: any, propertyName: string, maxLength: number, regexpType: 'normal' | 'special') {
    if (params[propertyName].length > maxLength) {
      throw new Error(`参数 ${propertyName} 长度不能大于 ${maxLength} 个字符`)
    }

    const normalRegexp = new RegExp(/^[A-Za-z0-9]+$/, 'g')
    const specialRegexp = new RegExp(/^[A-Za-z0-9_\-|\*@]+$/, 'g')
    if (regexpType === 'normal') {
      if (!normalRegexp.test(params[propertyName])) {
        throw new Error(`参数 ${propertyName} 只能是字母或者数字`)
      }
    }

    if (regexpType === 'special') {
      if (!specialRegexp.test(params[propertyName])) {
        throw new Error(`参数 ${propertyName} 只能是数字、大小写字母或_-|*@`)
      }
    }
  }
}
