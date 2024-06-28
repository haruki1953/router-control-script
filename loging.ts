import { routerConfig } from "./config"
import http from "./http"

export const loginService = async () => {
  const res = await http.post(`/cgi-bin/`, {
    method: 'set',
    module: {
      security: {
        login: {
          username: routerConfig.username,
          password: btoa(routerConfig.password)
        }
      }
    }
  })
  if (res.data.error_code !== 0) {
    console.log('登录失败', res.data)
    throw new Error('登录失败')
  }
  return res
}

export const getStok = async (): Promise<string> => {
  const res = await loginService()
  return res.data.module.security.login.stok
}
