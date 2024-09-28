import { wifiDict } from "./config";
import { confirmLinking, dataService, getInternetStatus } from "./data";
import { getStok } from "./loging";
import { rebootService } from "./reboot";
import { WifiInfo } from "./type";
import { wispService } from "./wisp";

// 读取命令行参数
const args = process.argv.slice(2); // 去掉前两个元素
/*
数组的第一个元素是 Node.js 可执行文件的路径，
第二个元素是正在执行的脚本文件的路径，
从第三个元素开始是传递给脚本的实际命令行参数。
*/

// 定义 WifiType 类型
type WifiName = keyof typeof wifiDict;

// 类型守卫函数
function isWifiName(arg: any): arg is WifiName {
  return arg in wifiDict;
}

(async () => {
  const stok = await getStok()
  console.log(`成功登录 stok: ${stok}`)

  if (args.length <= 0) {
    console.log(`未输入命令`)
    return

  } else if (args[0] === 'reboot') {
    // 重启
    await rebootService(stok)
    console.log(`正在重启`)

  } else if (isWifiName(args[0])) {
    let isSucess = false
    while (!isSucess) {
      // 桥接
      const wifiInfo = wifiDict[args[0]]
      await wispService(stok, wifiInfo)
        .catch(async () => {
          console.log(`桥接失败，重试中`)
          await new Promise((resolve) => setTimeout(resolve, 5000))
        })
        .then(() => {
          console.log(`正在桥接 ${wifiInfo.ssid}`)
          isSucess = true
        })
    }

  } else {
    console.log(`命令无效`)
    return
  }

  await confirmLinking()
})()