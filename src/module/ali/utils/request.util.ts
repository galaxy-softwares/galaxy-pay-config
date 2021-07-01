import { Injectable, HttpService, Inject } from '@nestjs/common'
import * as axios from 'axios'
import { AliSignUtil } from './sign.util'
import { AliParamsUtil } from './params.util'

/**
 * 支付宝支付请求
 */
@Injectable()
export class AliRequestUtil {
  constructor(
    @Inject(HttpService) private readonly httpService: HttpService,
    @Inject(AliParamsUtil) protected readonly paramsUtil: AliParamsUtil,
    @Inject(AliSignUtil) protected readonly singinUtil: AliSignUtil
  ) {}

  /**
   * 支付宝get请求
   *
   * @param url 请求地址
   * @param public_key 支付宝公钥
   * @param config 支付请求头配置
   */
  async post<T>(url: string, public_key: string, axios_config?: axios.AxiosRequestConfig): Promise<T> {
    try {
      const { data } = await this.httpService.post<T>(`${url}`, axios_config).toPromise()
      if (!this.singinUtil.responSignVerify(data, public_key)) {
        throw new Error('支付宝支付接口返回签名有误')
      }
      return data
    } catch (error) {
      throw new Error('支付包请求接口时出现网络异常：' + error.toString())
    }
  }
}
