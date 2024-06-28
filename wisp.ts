import http from "./http"
import { WifiInfo } from "./type"

export const wispService = async (stok: string, wifiInfo: WifiInfo) => {
  const res = await http.post(`/cgi-bin/stok=${stok}/data`, {
    method: 'set',
    module: {
      wisp: {
        config: {
          enable: 1,
          band: 0,
          bssid: wifiInfo.bssid,
          ssid: wifiInfo.ssid,
          password: wifiInfo.password,
          safe_mode: 'WPA2-PSK',
          encryption: 'AES'
        }
      }
    }
  })
  if (res.data.error_code !== 0) {
    console.log('桥接请求失败', res.data)
    throw new Error('桥接请求失败')
  }
  return res
}