import { Injectable } from '@nestjs/common'
import { AlipayConfig } from '../interfaces'
import {
  AlipayDataDataserviceBillDownloadurlQueryBizContent,
  AlipayDataDataserviceBillDownloadurlQueryRes,
  AlipayDataDataserviceBillDownloadurlQueryResData
} from '../interfaces/data.interface'
import { AliPayBaseService } from './base.service'

@Injectable()
export class AliDataPayService extends AliPayBaseService {
  /**
   * 支付宝 查询对账单下载地址
   * @param biz_content
   * @param alipay_config
   */
  async dataserviceBillDownloadurlQuery(
    biz_content: AlipayDataDataserviceBillDownloadurlQueryBizContent,
    alipay_config: AlipayConfig
  ): Promise<AlipayDataDataserviceBillDownloadurlQueryRes> {
    try {
      const url = this.processParams(biz_content, 'alipay.data.dataservice.bill.downloadurl.query', alipay_config)
      const { alipay_data_dataservice_bill_downloadurl_query_response } = await this.requestUtil.post<
        AlipayDataDataserviceBillDownloadurlQueryResData
      >(url, alipay_config.public_key)
      return alipay_data_dataservice_bill_downloadurl_query_response
    } catch (e) {
      throw new Error(e.toString())
    }
  }
}
