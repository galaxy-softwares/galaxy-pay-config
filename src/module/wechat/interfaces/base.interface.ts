/**
 * 微信支付配置信息
 */
type BaseNotifyReturnUrl = Record<'notify_url' | 'return_url' | 'callback_url', string>
export type WechatConfig = Record<'appid' | 'mch_id' | 'mch_key' | 'app_secret' | 'apiclient_cert', string> &
  BaseNotifyReturnUrl

/** 微信支付接口基础返回结果 */
export interface WeChatBaseResponse {
  /** 返回状态码 */
  return_code: string
  /** 返回信息 */
  return_msg: string
  /** 公众账号APPID或应用APPID */
  appid: string
  /** 商户号 */
  mch_id: string
  /** 设备号 */
  device_info?: string
  /** 随机字符串 */
  nonce_str: string
  /** 签名 */
  sign: string
  /** 业务结果 */
  result_code: string
  /** 错误代码 */
  err_code?: string
  /** 错误代码描述 */
  err_code_des?: string
}

/** 微信交易账单下载 */
export interface WeChatDownloadBillParam {
  bill_date: string
  bill_type?: 'ALL' | 'SUCCESS' | 'REFUND' | 'RECHARGE_REFUND'
  tar_type?: 'GZIP'
}

/** 微信交易账单下载接口返回结果 */
export interface WeChatDownloadBillRes {
  /** 返回状态码 */
  return_code: string
  /** 返回信息 */
  return_msg: string
  /** 业务结果 */
  result_code: string
  /** 错误代码 */
  err_code?: string
  /** 错误代码描述 */
  err_code_des?: string
}

/** 微信资金账单下载 */
export interface WechatDownloadFundFlowParam {
  bill_date: string
  account_type: 'Basic' | 'Operation' | 'Fees'
  tar_type?: 'GZIP'
}

/** 微信资金账单下载接口返回结果 */
export type WechatDownloadFundFlowRes = WeChatDownloadBillRes
