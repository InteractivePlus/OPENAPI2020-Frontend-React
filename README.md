# OPENAPI2020-Frontend-React

此项目是形随意动OpenAPI前端页面。  
使用React进行开发，Material-UI作为基础界面库。  
目前为单页面应用。  

开发者：Zhelearn, Wey, SweetIceLolly  

---

## 参与此项目 | Contribute to this project
### 环境说明
- node 12.15.0
- yarn 1.22.4(可选) 

### 初始化
```
npm install
```

### 开发模式
`npm run start` 或 `yarn start`

### 生产模式
`npm run build` 或 `yarn build`

### 补充
该项目前后端分离，因为浏览器默认不支持跨域访问，所以本地调试时需要做些调整。  
Chrome用户可参考 https://www.cnblogs.com/duchaoqun/p/12792451.html

vscode用户可参考以下配置，修改`launch.json`实现Chrome跨域调试启动（本repo已经包含了这一配置，在.vscode文件夹下）
```
"configurations": [
        
        {
            "type": "chrome",
            "request": "launch",
            "name": "Launch Chrome against localhost",
            "url": "http://localhost:3000",
            "webRoot": "${workspaceFolder}",
            "runtimeArgs": ["--disable-web-security"]
        }
    ]
```
在vscode启动调试前需要先进入开发模式。
