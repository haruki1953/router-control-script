这是一个基于node的脚本，用于控制路由器（斐讯路由器）
- 设备型号：K2 mini
- 软件版本：22.1.9.63
- 硬件版本：A1

开发记录： https://github.com/haruki1953/240627-router-control-script-dev/tree/master/240627-router-control-script-dev

## 安装依赖

在运行脚本之前，请确保安装所有依赖项。运行以下命令：
```sh
pnpm install
```

## 使用方法

### 配置config.ts

将根目录下的 config.ts.example 重命名为 config.ts，进行配置

[config.ts.example](config.ts.example) 

### 运行脚本
你可以通过以下命令运行脚本并传递命令参数：
```sh
ts-node index.ts <命令>
```

其中 `<命令>` 可以是以下之一：
- `reboot`：重启路由器
- `<WiFi 名称>`：桥接指定的 WiFi 网络

WiFi信息须在 `config.ts` 配置