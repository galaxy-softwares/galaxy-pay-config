import { AlipayBaseRes } from './base.interface'

/**
 * 支付宝 查询对账单下载地址
 */
export interface AlipayDataDataserviceBillDownloadurlQueryBizContent {
  bill_type: string
  bill_date: string
}

export interface AlipayDataDataserviceBillDownloadurlQueryRes extends AlipayBaseRes {
  bill_download_url: string
}

export interface AlipayDataDataserviceBillDownloadurlQueryResData {
  alipay_data_dataservice_bill_downloadurl_query_response: AlipayDataDataserviceBillDownloadurlQueryRes
  sign: string
}
