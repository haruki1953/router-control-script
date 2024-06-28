import http from "./http"
import { getStok } from "./loging"

export const dataService = async (stok: string) => {
  const res = await http.post(`/cgi-bin/stok=${stok}/data`, {
    method: 'get',
    module: {
      device_manage: {
        client_list: null
      },
      network: {
        wan_status: null
      }
    }
  })
  if (res.data.error_code !== 0) {
    console.log('网络状态获取失败', res.data)
    throw new Error('网络状态获取失败')
  }
  return res
}

export const getInternetStatus = async (stok: string): Promise<string> => {
  const res = await dataService(stok)
  return res.data.module.network.wan_status.internet_status
}

export const confirmLinking = async () => {
  let count = 0
  let internetStatus = ''
  let stok = ''
  while(1){
    // 等待两秒
    await new Promise((resolve) => setTimeout(resolve, 2000))
    count += 1
    console.log(`第 ${count} 次，请求中...`)

    if (!stok) {
      try {
        stok = await getStok()
      } catch (error) {
        continue
      }
      console.log(`成功登录 stok: ${stok}`)
    }

    try {
      internetStatus = await getInternetStatus(stok)
      console.log(`internet_status: ${internetStatus}`)
    } catch (error) {}

    if (internetStatus === '1') {
      console.log('网络连接成功')
      await new Promise((resolve) => setTimeout(resolve, 2000))
      break
    }
  }
}