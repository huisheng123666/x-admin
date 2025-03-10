<h1 style="text-align: center">X-ADMIN 后台管理系统</h1>
<div style="text-align: center">

</div>

#### 项目简介

一个基于 vue3、typescript、element-plus、koa、mongodb 的前后端分离的后台管理系统  
参考了 el-admin 的功能，但本人前端一枚，仅实现部分功能，后台部分随便撸的，low 点对我来说无所谓，各位后台有兴趣的可以重写

**体验地址：** [https://v.xmw.monster](https://v.xmw.monster)

**账号密码：** `admin / 123456`

#### 主要特性

- 使用最新技术栈，社区资源丰富。
- 放弃了动态路由，动态路由本身会无脑动态话 view 下的所有文件没有必要，嵌套多层的路由结构也很蛋疼
- 没有复杂的 crud.js，没有找不到头绪的 mixins，全部使用 Composition API，让代码可读性更好，代码提示健全

#### 系统功能

- 用户管理：提供用户的相关配置，新增用户后，默认密码为 123456
- 角色管理：对权限与菜单进行分配，可根据部门设置角色的菜单按钮权限
- 部门管理：可配置系统组织架构，树形表格展示

#### 详细结构

```
- components 公共组件
- views 路由文件
- hooks 公共hook
- instruction 自定义指令
- x-admin-node 服务端代码
```

#### 遗憾

- 虽然使用了 ts，但还是有很多地方使用 any，基本搞成了 any script，我对 ts 还是不熟，后面熟了再改进
- 后台部分写的太简单，后面有机会的话会替换成 nest.js，使用 koa 做基础，自己做架构还是不太行，随便学习下 nest.js
- 审批相关的东西只是随便搞了一下，虽然知道会有 bug，但也懒得弄了，node 也没有像样的工作流框架
