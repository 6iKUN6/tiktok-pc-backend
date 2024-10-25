# 重构短视频平台

## 技术选型

前端：react+pnpm+vite

后端：node+nest

## 需求

网页短视频应用

使用七牛云存储、七牛视频相关产品（如视频截帧等）开发一款Web端短视频应用

基础功能（必须实现）

1. 视频播放：播放、暂停、进度条拖拽
2. 内容分类：视频内容分类页，如热门视频、体育频道
3. ­视频切换：可通过上下键翻看视频

高级功能（可选实现）

1. 账户系统：用户可登录，收藏视频
2. 可参考常见短视频应用自由增加功能，提升完善度，如点赞、分享、关注、搜索等



## 后端搭建

nest

node v  20.9.0

pnpm

端口 8899

mysql v:5.6

### 启动

```
pnpm insatll
npm run start
```



### 测试链接

```
http://localhost:8899/api/user/findOne?username=zhangsan
```



项目结构

```
-src
---config 			配置
-------.sql			初始化数据库
-------dbConfig.ts	数据库账号配置
---database			数据库
---user				user 接口模块
---app				app 模块聚合
---main.ts			主文件
```

