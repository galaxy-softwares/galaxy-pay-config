import { AlipayBaseBizContent, AlipayBaseRes } from './base.interface'

/**
 * 支付宝 统一收单交易支付接口
 */
export interface AlipayTradePayBizContent extends AlipayBaseBizContent {
  scene: string
  auth_code: string
  buyer_id: string
  seller_id: string
  trans_currency: string
  settle_currency: string
  discountable_amount?: string
  operator_id?: string
  terminal_id?: string
  extend_params?: {
    sys_service_provider_id?: string
    card_type?: string
  }
  timeout_express?: string
  auth_confirm_mode?: string
  terminal_params?: string
  promo_params?: {
    actual_order_time: string
  }
  advance_payment_type?: string
  query_options?: Array<string>
  request_org_pid?: string
  is_async_pay?: string
}

export interface AlipayTradePayRes extends AlipayBaseRes {
  buyer_logon_id: string
  settle_amount: string
  pay_currency: string
  pay_amount: string
  settle_trans_rate: string
  total_amount: number
  trans_currency: string
  settle_currency: string
  receipt_amount: string
  buyer_pay_amount: number
  point_amount: number
  invoice_amount: number
  gmt_payment: string
  fund_bill_list: Array<{
    fund_channel: string
    amount: number
    real_amount: number
  }>
  card_balance: number
  store_name: string
  buyer_user_id: string
  discount_goods_detail: string
  voucher_detail_list: Array<{
    id: string
    name: string
    type: string
    amount: number
    merchant_contribute: number
    other_contribute: number
    memo: string
    template_id: string
    purchase_buyer_contribute: number
    purchase_merchant_contribute: number
    purchase_ant_contribute: number
  }>
  advance_amount: string
  auth_trade_pay_mode: string
  charge_amount: string
  charge_flags: string
  settlement_id: string
  business_params: string
  buyer_user_type: string
  mdiscount_amount: string
  discount_amount: string
  buyer_user_name: string
}

export interface AlipayTradePayResData {
  sign: string
  alipay_trade_pay_response: AlipayTradePayRes
}

/**
 * 支付宝统一收单线下交易预创建
 */
export interface AlipayTradePrecreateBizContent extends AlipayBaseBizContent {
  seller_id?: string
  discountable_amount?: string
  operator_id?: string
  disable_pay_channels?: string
  enable_pay_channels?: string
  terminal_id?: string
  extend_params?: {
    sys_service_provider_id?: string
    card_type?: string
  }
  timeout_express?: string
  settle_info?: {
    settle_detail_infos: {
      trans_in_type: string
      trans_in: string
      summary_dimension?: string
      settle_entity_id?: string
      settle_entity_type?: string
      amount: string
    }
    settle_period_time: string
  }
  merchant_order_no?: string
  business_params?: {
    campus_card?: string
    card_type?: string
    actual_order_time?: string
  }
  qr_code_timeout_express?: string
}

export interface AlipayTradePrecreateRes extends AlipayBaseRes {
  qr_code: string
}

export interface AlipayTradePrecreateResData {
  sign: string
  alipay_trade_precreate_response: AlipayTradePrecreateRes
}

/**
 * 支付宝退款查询
 */
export interface AlipayTradeRefundQueryBizContent {
  trade_no?: string
  out_trade_no?: string
  out_request_no: string
  org_pid?: string
  query_options?: Array<string>
}

export interface AlipayTradeQueryRefundResData {
  sign: string
  alipay_trade_fastpay_refund_query_response: AlipayTradeQueryRefundRes
}

export interface AlipayTradeQueryRefundRes extends AlipayBaseRes {
  refund_reason: string
  total_amount: number
  refund_amount: number
  refund_royaltys: Array<{
    refund_amount: number
    royalty_type: string
    result_code: string
    trans_out: string
    trans_out_email: string
    trans_in: string
    trans_in_email: string
  }>
  gmt_refund_pay: string
  refund_detail_item_list: Array<{
    fund_channel: string
    bank_code: string
    amount: number
    real_amount: number
    fund_type: string
  }>
  send_back_fee: string
  refund_settlement_id: string
  present_refund_buyer_amount: string
  present_refund_discount_amount: string
  present_refund_mdiscount_amount: string
  deposit_back_info: Array<{
    has_deposit_back: boolean
    dback_status: string
    dback_amount: number
    bank_ack_time: string
    est_bank_receipt_time: string
  }>
}

/**
 * 支付宝统一收单交易创建
 */
export interface AlipayTradeCreateBizContent extends AlipayBaseBizContent {
  discountable_amount?: string
  buyer_id?: string
  operator_id?: string
  terminal_id?: string
  extend_params?: {
    sys_service_provider_id?: string
    hb_fq_num?: string
    hb_fq_seller_percent?: string
    industry_reflux_info?: string
    card_type?: string
  }
  timeout_express?: string
  settle_info?: {
    settle_detail_infos: {
      trans_in_type: string
      trans_in: string
      summary_dimension?: string
      settle_entity_id?: string
      settle_entity_type?: string
      amount: string
    }
    settle_period_time: string
  }
  logistics_detail?: {
    logistics_type?: string
  }
  business_params?: {
    campus_card?: string
    card_type?: string
    actual_order_time?: string
  }
  receiver_address_info?: {
    name?: string
    address?: string
    mobile?: string
    zip?: string
    division_code?: string
  }
}

export type AlipayTradeCreateRes = AlipayBaseRes

export interface AlipayTradeCreateResData {
  sign: string
  alipay_trade_create_response: AlipayTradeCreateRes
}

/**
 * 支付宝交易查询接口
 *
 */
export interface AlipayTradeQueryBizContent {
  out_trade_no?: string
  trade_no?: string
  org_pid?: string
  query_options?: Array<string>
}

export interface AlipayTradeQueryResData {
  sign: string
  alipay_trade_query_response: AlipayTradeQueryRes
}

export interface AlipayTradeQueryRes extends AlipayBaseRes {
  buyer_logon_id: string
  trade_status: string
  total_amount: number
  trans_currency: string
  settle_currency: string
  settle_amount: number
  pay_currency: number
  pay_amount: string
  settle_trans_rate: string
  trans_pay_rate: string
  buyer_pay_amount: number
  point_amount: number
  invoice_amount: number
  send_pay_date: string
  receipt_amount: string
  store_id: string
  terminal_id: string
  fund_bill_list: [
    Array<{
      fund_channel: string
      amount: 10
      real_amount: 11.21
    }>
  ]
  store_name: string
  buyer_user_id: string
  charge_amount: string
  charge_flags: string
  settlement_id: string
  trade_settle_info: {
    trade_settle_detail_list: Array<{
      operation_type: string
      operation_serial_no: string
      operation_dt: string
      trans_out: string
      trans_in: string
      amount: number
    }>
  }
  auth_trade_pay_mode: string
  buyer_user_type: string
  mdiscount_amount: string
  discount_amount: string
  subject: string
  body: string
  alipay_sub_merchant_id: string
  ext_infos: string
}

/***
 * 支付宝交易关闭
 *
 */
export interface AlipayTradeCloseBizContent {
  out_trade_no?: string
  trade_no?: string
  operator_id?: string
}

export interface AlipayTradeCloseResData {
  sign: string
  alipay_trade_close_response: AlipayTradeQueryRes
}

export type AlipayTradeCloseRes = AlipayBaseRes

/**
 * 支付宝交易退款
 */
export interface AlipayTradeRefundBizContent {
  trade_no: string
  refund_amount: string
  refund_currency?: string
  refund_reason?: string
  out_request_no?: string
  operator_id?: string
  terminal_id?: string
  refund_royalty_parameters?: any
  org_pid?: string
  query_options?: string
}

export interface AlipayTradeRefundResData {
  sign: string
  alipay_trade_refund_response: AlipayTradeRefundRes
}

export interface AlipayTradeRefundRes extends AlipayBaseRes {
  buyer_logon_id: string
  fund_change: string
  refund_fee: number
  refund_currency: string
  gmt_refund_pay: string
  refund_detail_item_list: Array<any>
  store_name: string
  buyer_user_id: string
  refund_preset_paytool_list: any
  refund_settlement_id: string
  present_refund_buyer_amount: string
  present_refund_discount_amount: string
  present_refund_mdiscount_amount: string
}

/**
 * 支付宝统一收单交易撤销接口
 *
 */
export interface AlipayTradeCancelBizContent {
  out_trade_no?: string
  trade_no?: string
}

export interface AlipayTradeCancelResData {
  sign: string
  alipay_trade_cancel_response: AlipayTradeCancelRes
}

export type AlipayTradeCancelRes = AlipayBaseRes
