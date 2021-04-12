1. 搭建 react环境`create-react-app 项目名`
2. 安装 `react-router-dom`
3. 对 nav 进行懒加载
4. 在 app.js中 Suspense 的标签上加上一个 loading<br>
    loading... 看不到效果问题<br>
    fallback只能写成 fallback={<loading />}，而不能直接写 loading
5. css 用`styled-components`来替代
    安装 `yarn add styled-components`
6. 将整体页面高度设为100% main => flex: 1
        footer 将一直在最底部
7. auth.js 专门处理登录和注册的状态和行为<br>
    在auth.js中引入 mobx`yarn add mobx`
8. yarn eject 命令执行前要全部 add
9. 引入 ant-design UI组件库 `yarn add antd`
    也需要引入 antd 的样式，文档里有现成的 import 样式
10. 自定义校验函数 `validator: validateUsername`
11. 使用leancloud  [参考网站](https://leancloud.cn/docs/sdk_setup-js.html#hash1620893804) 
        安装 leancloud `yarn add leancloud-storage`
