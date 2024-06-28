import axios from "axios"
import http from "./http"

export const rebootService = async (stok: string) => {
  const res = await http.post(`/cgi-bin/stok=${stok}/system/reboot`)
  if (res.data.error_code !== 0) {
    console.log('重启请求失败', res.data)
    throw new Error('重启请求失败')
  }
  return res
}