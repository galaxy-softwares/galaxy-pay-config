import { AlipayBaseRes } from './base.interface'

/**
 * 支付宝单笔转账
 */
export interface AlipayFundTransUniTransferBizContent {
  out_biz_no: string
  trans_amount: string
  product_code: string
  biz_scene?: string
  order_title?: string
  original_order_id?: string
  payee_info: {
    identity: string
    identity_type: string
    name: string
  }
  remark: string
  business_params: string
}

export interface AlipayFundTransUniTransferRes extends AlipayBaseRes {
  out_biz_no: string
  order_id: string
  pay_fund_order_id: string
  status: string
  trans_date: string
}

export interface AlipayFundTransUniTransferResData {
  sign: string
  alipay_fund_trans_uni_transfer_response: AlipayFundTransUniTransferRes
}

/**
 * 查询转账订单接口
 */
export interface AlipayFundTransOrderQueryBizContent {
  out_biz_no?: string
  order_id?: string
}

export interface AlipayFundTransOrderQueryRes extends AlipayBaseRes {
  order_id: string
  status: string
  pay_date: string
  arrival_time_end: string
  order_fee: string
  fail_reason: string
  out_biz_no: string
  error_code: string
}

export interface AlipayFundTransOrderQueryResData {
  sign: string
  alipay_fund_trans_order_query_response: AlipayFundTransOrderQueryRes
}

/**
 * 支付宝转账业务单据查询接口
 */
export interface AlipayFundTransCommonQueryBizContent {
  product_code?: string
  biz_scene?: string
  out_biz_no?: string
  order_id?: string
  pay_fund_order_id?: string
}

export interface AlipayFundTransCommonQueryRes extends AlipayBaseRes {
  order_id: string
  pay_fund_order_id: string
  out_biz_no: string
  trans_amount: string
  status: string
  pay_date: string
  arrival_time_end: string
  order_fee: string
  error_code: string
  fail_reason: string
}

export interface AlipayFundTransCommonQueryResData {
  sign: string
  alipay_fund_trans_common_query_response: AlipayFundTransCommonQueryRes
}
