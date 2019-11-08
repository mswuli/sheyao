# 医药四方云平台

##### 注意：在Mac系统上，执行安装命令时需要提升权限(执行sudo命令)，否则将不能正常安装依赖库。

#### 项目介绍
{**以下是码云平台说明，您可以替换为您的项目简介**
码云是开源中国推出的基于 Git 的代码托管平台（同时支持 SVN）。专为开发者提供稳定、高效、安全的云端软件开发协作平台
无论是个人、团队、或是企业，都能够用码云实现代码托管、项目管理、协作开发。企业项目请看 [https://gitee.com/enterprises](https://gitee.com/enterprises)}

***目录结构说明***
```
  apis：基于koa2的web api接口实现文件
  configs：配置文件目录
  |____scripts：sql脚本保存目录
  libs：自定义扩展
  static：webpack生成文件保存目录
  views：koa2页面视图目录(不需要关注)
  vue-webpack：基于webpack+vue2的项目
  |____build：webpack配置文件目录
  |    |____build.js：webpack的主配置文件，入口
  |    |____webpack.base.conf.js：webpack公共配置文件
  |    |____webpack.dev.conf.js：开发模式的webpack配置文件
  |    |____webpack.prod.conf.js：生产模式的webpack配置文件
  |____config：webpack公用配置项设置
  |    |____index.js：公用项配置文件
  |    |____dev.env.js：标记当前环境为开发模式
  |____|____prod.env.js：标记当前环境为生产模式
  src：vue源码目录
  |____assets：静态资源目录
  |    |____css：样式表文件
  |    |____iconfont：字体
  |    |____images：图片目录
  |____|____js：JavaScript文件目录
  components：vue页面组件源码目录
  router：vue-router路由主配置文件目录
  App.vue：vue入口组件
  main.js：vue入口文件

```

#### 安装教程

1. Node.js版本为8.11.2及以上。
2. Node.js安装完成后，进入项目目录，执行npm i命令安装项目所需的依赖库。
```
   npm i   // 主目录下
```
3. 全局安装webpack。
```
  npm i -g webpack
```

#### 使用说明

1. 开发模式：依次执行如下命令
```
npm run dev   // 启动vue开发服务器
```
2. 生产模式
```
npm run build  // 生成vue静态资源
```

#### 参与贡献

1. Fork 本项目
2. 新建 Feat_xxx 分支
3. 提交代码
4. 新建 Pull Request


#### 码云特技

1. 使用 Readme\_XXX.md 来支持不同的语言，例如 Readme\_en.md, Readme\_zh.md
2. 码云官方博客 [blog.gitee.com](https://blog.gitee.com)
3. 你可以 [https://gitee.com/explore](https://gitee.com/explore) 这个地址来了解码云上的优秀开源项目
4. [GVP](https://gitee.com/gvp) 全称是码云最有价值开源项目，是码云综合评定出的优秀开源项目
5. 码云官方提供的使用手册 [http://git.mydoc.io/](http://git.mydoc.io/)
6. 码云封面人物是一档用来展示码云会员风采的栏目 [https://gitee.com/gitee-stars/](https://gitee.com/gitee-stars/)