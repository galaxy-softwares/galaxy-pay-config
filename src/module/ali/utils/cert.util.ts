import { Injectable } from '@nestjs/common'
import * as fs from 'fs'
import bignumber from 'bignumber.js'
import * as crypto from 'crypto'
import * as x509 from '@fidm/x509'

/**
 * 支付宝证书工具
 */
@Injectable()
export class AliCertUtil {
  /**
   * 支付宝证书模式
   * @param app_cert_sn_path string
   * @param alipay_root_cert_sn_path string
   * @param alipay_public_cert_path string
   */
  public getCertPattern(
    app_cert_sn_path: string,
    alipay_root_cert_sn_path: string,
    alipay_public_cert_path: string
  ): {
    app_cert_sn: string
    alipay_root_cert_sn: string
    public_key: string
  } {
    const app_cert_sn = this.getSNFromPath(app_cert_sn_path, false)
    const alipay_root_cert_sn = this.getSNFromPath(alipay_root_cert_sn_path, true)
    const public_key = this.loadPublicKeyFromPath(alipay_public_cert_path)
    return {
      app_cert_sn,
      alipay_root_cert_sn,
      public_key
    }
  }

  /**
   * 从公钥证书文件里读取支付宝公钥
   * @param file_path string
   */
  public loadPublicKeyFromPath(file_path: string): string {
    const file_data = fs.readFileSync(file_path)
    const certificate = x509.Certificate.fromPEM(file_data)
    return certificate.publicKeyRaw.toString('base64')
  }

  /**
   * 从证书文件里读取序列号string
   * @param filePath string
   * @param isRoot string
   */
  public getSNFromPath(file_path: string, is_root = false): string {
    const file_data = fs.readFileSync(file_path)
    return this.getSN(file_data, is_root)
  }

  /**
   * 从上传的证书内容或Buffer读取序列号
   * @param file_data string
   * @param is_root string
   */
  public getSN(file_data: string | Buffer, is_root = false): string {
    if (typeof file_data == 'string') {
      file_data = Buffer.from(file_data)
    }
    if (is_root) {
      return this.getRootCertSN(file_data)
    }
    const certificate = x509.Certificate.fromPEM(file_data)
    return this.getCertSN(certificate)
  }

  /**
   * 读取序列号
   * @param certificate string
   */
  public getCertSN(certificate: any): string {
    const { issuer, serialNumber } = certificate
    const principalName = issuer.attributes
      .reduceRight((prev, curr) => {
        const { shortName, value } = curr
        const result = `${prev}${shortName}=${value},`
        return result
      }, '')
      .slice(0, -1)
    const decimalNumber = new bignumber(serialNumber, 16).toString(10)
    const SN = crypto
      .createHash('md5')
      .update(principalName + decimalNumber, 'utf8')
      .digest('hex')
    return SN
  }

  /**
   * 读取根证书序列号
   * @param rootContent string
   */
  public getRootCertSN(root_rontent: Buffer): string {
    const certificates = x509.Certificate.fromPEMs(root_rontent)
    let rootCertSN = ''
    certificates.forEach(item => {
      if (item.signatureOID.startsWith('1.2.840.113549.1.1')) {
        const SN = this.getCertSN(item)
        if (rootCertSN.length === 0) {
          rootCertSN += SN
        } else {
          rootCertSN += `_${SN}`
        }
      }
    })
    return rootCertSN
  }
}
