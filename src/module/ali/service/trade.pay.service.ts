import { Injectable } from '@nestjs/common'
import { AliPayBaseService } from './base.service'
import { AlipayConfig } from '../interfaces/base.interface'
import {
  AlipayTradeCloseBizContent,
  AlipayTradeCloseRes,
  AlipayTradeCloseResData,
  AlipayTradeCreateBizContent,
  AlipayTradeCreateRes,
  AlipayTradeCreateResData,
  AlipayTradeRefundBizContent,
  AlipayTradeQueryBizContent,
  AlipayTradeQueryRefundRes,
  AlipayTradeQueryRefundResData,
  AlipayTradeQueryRes,
  AlipayTradeQueryResData,
  AlipayTradeRefundQueryBizContent,
  AlipayTradeRefundRes,
  AlipayTradeRefundResData,
  AlipayTradePayBizContent,
  AlipayTradePrecreateBizContent,
  AlipayTradePrecreateRes,
  AlipayTradePrecreateResData,
  AlipayTradePayResData,
  AlipayTradePayRes,
  AlipayTradeCancelBizContent,
  AlipayTradeCancelRes,
  AlipayTradeCancelResData
} from '../interfaces/trade.interface'

@Injectable()
export class AliTradePayService extends AliPayBaseService {
  /**
   * 支付宝交易查询接口
   * @param biz_content AlipayConfig
   * @param alipay_config
   */
  async query(biz_content: AlipayTradeQueryBizContent, alipay_config: AlipayConfig): Promise<AlipayTradeQueryRes> {
    if (!biz_content.out_trade_no && !biz_content.trade_no) {
      throw new Error('参数有误，out_trade_no、trade_no 二选一')
    }
    try {
      const url = this.processParams(biz_content, 'alipay.trade.query', alipay_config)
      const { alipay_trade_query_response } = await this.requestUtil.post<AlipayTradeQueryResData>(
        url,
        alipay_config.public_key
      )
      return alipay_trade_query_response
    } catch (e) {
      throw new Error(e.toString())
    }
  }

  /**
   * 支付宝交易退款接口
   * @param biz_content AlipayTradeRefundBizContent
   * @param alipay_config AlipayConfig
   */
  async refund(biz_content: AlipayTradeRefundBizContent, alipay_config: AlipayConfig): Promise<AlipayTradeRefundRes> {
    try {
      const url = this.processParams(biz_content, 'alipay.trade.refund', alipay_config)
      const { alipay_trade_refund_response } = await this.requestUtil.post<AlipayTradeRefundResData>(
        url,
        alipay_config.public_key
      )
      return alipay_trade_refund_response
    } catch (e) {
      throw new Error(e.toString())
    }
  }

  /**
   * 支付宝统一收单交易创建接口
   * @param biz_content AlipayRequestParam
   * @param private_key string
   */
  async create(biz_content: AlipayTradeCreateBizContent, alipay_config: AlipayConfig): Promise<AlipayTradeCreateRes> {
    try {
      const url = this.processParams(biz_content, 'alipay.trade.create', alipay_config)
      const { alipay_trade_create_response } = await this.requestUtil.post<AlipayTradeCreateResData>(
        url,
        alipay_config.public_key
      )
      return alipay_trade_create_response
    } catch (e) {
      throw new Error(e.toString())
    }
  }

  /**
   * 支付宝关闭交易接口
   * @param biz_content
   * @param alipay_config AlipayConfig
   */
  async close(biz_content: AlipayTradeCloseBizContent, alipay_config: AlipayConfig): Promise<AlipayTradeCloseRes> {
    if (!biz_content.out_trade_no && !biz_content.trade_no) {
      throw new Error('参数有误，out_trade_no、trade_no 二选一')
    }
    try {
      const url = this.processParams(biz_content, 'alipay.trade.close', alipay_config)
      const { alipay_trade_close_response } = await this.requestUtil.post<AlipayTradeCloseResData>(
        url,
        alipay_config.public_key
      )
      return alipay_trade_close_response
    } catch (e) {
      throw new Error(e.toString())
    }
  }

  /**
   * 支付宝退款交易查询
   * @param biz_content AlipayTradeRefundQueryBizContent
   * @param alipay_config AlipayConfig
   */
  async fastpayRefundQuery(
    biz_content: AlipayTradeRefundQueryBizContent,
    alipay_config: AlipayConfig
  ): Promise<AlipayTradeQueryRefundRes> {
    if (!biz_content.out_trade_no && !biz_content.trade_no) {
      throw new Error('参数有误，out_trade_no、trade_no 二选一')
    }
    try {
      const url = this.processParams(biz_content, 'alipay.trade.fastpay.refund.query', alipay_config)
      const { alipay_trade_fastpay_refund_query_response } = await this.requestUtil.post<AlipayTradeQueryRefundResData>(
        url,
        alipay_config.public_key
      )
      return alipay_trade_fastpay_refund_query_response
    } catch (e) {
      throw new Error(e.toString())
    }
  }

  /**
   * 支付宝 统一收单交易撤销接口
   * @param biz_content AlipayTradeCancelBizContent
   * @param alipay_config AlipayConfig
   */
  async cancel(biz_content: AlipayTradeCancelBizContent, alipay_config: AlipayConfig): Promise<AlipayTradeCancelRes> {
    if (!biz_content.out_trade_no && !biz_content.trade_no) {
      throw new Error('参数有误，out_trade_no、trade_no 二选一')
    }
    try {
      const url = this.processParams(biz_content, 'alipay.trade.cancel', alipay_config)
      const { alipay_trade_cancel_response } = await this.requestUtil.post<AlipayTradeCancelResData>(
        url,
        alipay_config.public_key
      )
      return alipay_trade_cancel_response
    } catch (e) {
      throw new Error(e.toString())
    }
  }

  /**
   * 支付宝统一收单线下交易预创建
   * @param biz_content AlipayPrecreateBizContent
   * @param alipay_config AlipayConfig
   */
  async precreate(
    biz_content: AlipayTradePrecreateBizContent,
    alipay_config: AlipayConfig
  ): Promise<AlipayTradePrecreateRes> {
    try {
      const url = this.processParams(biz_content, 'alipay.trade.precreate', alipay_config)
      const { alipay_trade_precreate_response } = await this.requestUtil.post<AlipayTradePrecreateResData>(
        url,
        alipay_config.public_key
      )
      return alipay_trade_precreate_response
    } catch (e) {
      throw new Error(e.toString())
    }
  }

  /**
   * 支付宝 统一收单交易支付接口
   * @param biz_content
   * @param alipay_config
   */
  async pay(biz_content: AlipayTradePayBizContent, alipay_config: AlipayConfig): Promise<AlipayTradePayRes> {
    try {
      const url = this.processParams(biz_content, 'alipay.trade.pay', alipay_config)
      const { alipay_trade_pay_response } = await this.requestUtil.post<AlipayTradePayResData>(
        url,
        alipay_config.public_key
      )
      return alipay_trade_pay_response
    } catch (e) {
      throw new Error(e.toString())
    }
  }
}
