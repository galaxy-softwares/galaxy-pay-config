import { Injectable } from '@nestjs/common'
import { AliPayBaseService } from './base.service'
import { AlipayConfig } from '../interfaces/base.interface'
import {
  AlipayFundTransCommonQueryBizContent,
  AlipayFundTransCommonQueryRes,
  AlipayFundTransCommonQueryResData,
  AlipayFundTransOrderQueryRes,
  AlipayFundTransOrderQueryResData,
  AlipayFundTransUniTransferBizContent,
  AlipayFundTransUniTransferRes,
  AlipayFundTransUniTransferResData
} from '../interfaces'

@Injectable()
export class AliFundPayService extends AliPayBaseService {
  /**
   * 支付宝单笔转账接口
   * @param biz_content AlipayFundTransUniTransferBizContent
   * @param alipay_config AlipayConfig
   */
  async transUniTransfer(
    biz_content: AlipayFundTransUniTransferBizContent,
    alipay_config: AlipayConfig
  ): Promise<AlipayFundTransUniTransferRes> {
    try {
      const url = this.processParams(biz_content, 'alipay.fund.trans.uni.transfer', alipay_config)
      const { alipay_fund_trans_uni_transfer_response } = await this.requestUtil.post<
        AlipayFundTransUniTransferResData
      >(url, alipay_config.public_key)
      return alipay_fund_trans_uni_transfer_response
    } catch (e) {
      throw new Error(e.toString())
    }
  }

  /**
   * 支付宝查询转账订单接口
   * @param biz_content AlipayFundTransUniTransferBizContent
   * @param alipay_config AlipayConfig
   */
  async transOrderQuery(
    biz_content: AlipayFundTransUniTransferBizContent,
    alipay_config: AlipayConfig
  ): Promise<AlipayFundTransOrderQueryRes> {
    try {
      const url = this.processParams(biz_content, 'alipay.fund.trans.order.query', alipay_config)
      const { alipay_fund_trans_order_query_response } = await this.requestUtil.post<AlipayFundTransOrderQueryResData>(
        url,
        alipay_config.public_key
      )
      return alipay_fund_trans_order_query_response
    } catch (e) {
      throw new Error(e.toString())
    }
  }

  /**
   * 支付宝转账业务单据查询接口
   * @param biz_content
   * @param alipay_config AlipayConfig
   */
  async transCommonQuery(
    biz_content: AlipayFundTransCommonQueryBizContent,
    alipay_config: AlipayConfig
  ): Promise<AlipayFundTransCommonQueryRes> {
    try {
      const url = this.processParams(biz_content, 'alipay.fund.trans.common.query', alipay_config)
      const { alipay_fund_trans_common_query_response } = await this.requestUtil.post<
        AlipayFundTransCommonQueryResData
      >(url, alipay_config.public_key)
      return alipay_fund_trans_common_query_response
    } catch (e) {
      throw new Error(e.toString())
    }
  }
}
