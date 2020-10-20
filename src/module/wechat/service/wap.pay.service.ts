import { Injectable } from '@nestjs/common';

import { WeChatOtherPayOrderReqParam, WeChatOtherPayOrderRes } from '../interfaces/order.interface';
import { WeChatPayBaseService } from './base.service';
import { WechatConfig } from '../interfaces/base.interface';

/**
 * 微信支付-H5支付类
 */
@Injectable()
export class WeChatWapPayService extends WeChatPayBaseService {
  /**
   * H5支付
   *
   * @param params H5支付接口请求参数
   */
  async pay(
    wechatConfig: WechatConfig,
    params: WeChatOtherPayOrderReqParam,
  ): Promise<WeChatOtherPayOrderRes> {
    return await this.requestUtil.post<WeChatOtherPayOrderRes>(
      this.unifiedOrderUrl,
      this.processParams(params, wechatConfig),
    );
  }
}
