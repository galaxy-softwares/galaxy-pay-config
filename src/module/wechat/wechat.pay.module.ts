import { Module, HttpModule } from '@nestjs/common';
import { WeChatAppletPayService } from './service/applet.pay.service';
import { WeChatPayBaseService } from './service/base.service';
import { WeChatRequestUtil } from './utils/request.util';
import { XmlUtil } from './utils/xml.util';
import { RandomUtil } from './utils/random.util';
import { WeChatSignUtil } from './utils/sign.util';
import { WeChatAppPayService } from './service/app.pay.service';
import { WeChatNativePayService } from './service/native.pay.service';
import { WeChatJSAPIPayService } from './service/jsapi.pay.service';
import { WeChatMicroPayService } from './service/micro.pay.service';
import { WeChatWapPayService } from './service/wap.pay.service';
import { WeChatNotifyParserUtil } from './utils/notify-parser.util';

@Module({
  imports: [HttpModule],
  controllers: [],
  providers: [
    WeChatAppletPayService,
    WeChatAppPayService,
    WeChatNativePayService,
    WeChatJSAPIPayService,
    WeChatMicroPayService,
    WeChatWapPayService,
    WeChatRequestUtil,
    WeChatPayBaseService,
    XmlUtil,
    WeChatSignUtil,
    RandomUtil,
    WeChatNotifyParserUtil,
  ],
  exports: [
    WeChatAppletPayService,
    WeChatAppPayService,
    WeChatRequestUtil,
    WeChatPayBaseService,
    WeChatNativePayService,
    WeChatJSAPIPayService,
    WeChatMicroPayService,
    WeChatWapPayService,
    WeChatSignUtil,
    XmlUtil,
    WeChatNotifyParserUtil,
  ],
})
export class WechatPayModule {}
