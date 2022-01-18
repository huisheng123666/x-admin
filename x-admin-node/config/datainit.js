const User = require("../models/userSchema");
const Menu = require("../models/menuSchema");
const Role = require("../models/roleSchema");
const Dept = require("../models/deptSchema");
const Counter = require("../models/counterSchema");

const admin = {
    "_id" : "61a73b179478014d3f065058",
    "userId" : 1000001,
    "userName" : "admin",
    "userPwd" : "e10adc3949ba59abbe56e057f20f883e",
    "userEmail" : "csmfdsf@qq.com",
    "mobile" : "18812345688",
    "deptId" : [
      "61dbdea4cb22978c039162fa"
    ],
    "job" : "前端开发",
    "state" : 1,
    "role" : 1,
    "roleList" : [
      "61d4f88d48f23e20ea14dd09"
    ],
    "isDelete" : false
  }

const menus = [
  {
    "sortLevel": 1,
    "_id": "61a8879a6c1629c52ece1ece",
    "createTime": "2021-12-02T08:45:12.378Z",
    "updateTime": "2021-12-02T08:45:12.378Z",
    "menuType": 1,
    "menuName": "系统管理",
    "menuCode": "",
    "path": "/system",
    "icon": "x-icon-cog",
    "parentId": [],
    "menuState": 1,
    "hasChildren": true,
    "isLeaf": false
  },
  {
    "sortLevel": 1,
    "_id": "61a888036c1629c52ece1ed0",
    "createTime": "2021-12-02T08:45:12.378Z",
    "updateTime": "2021-12-02T08:45:12.378Z",
    "menuType": 1,
    "menuName": "审批管理",
    "menuCode": "",
    "path": "/audit",
    "icon": "x-icon-quill",
    "parentId": [],
    "menuState": 1,
    "hasChildren": true,
    "isLeaf": false
  },
  {
    "_id": "61a8d64ef07fa983f5df9b67",
    "createTime": "2021-12-02T14:14:16.729Z",
    "updateTime": "2021-12-30T03:39:56.020Z",
    "menuType": 1,
    "menuName": "菜单管理",
    "menuCode": "",
    "path": "/system/menu",
    "icon": "x-icon-menu",
    "parentId": [
      "61a8879a6c1629c52ece1ece"
    ],
    "menuState": 1,
    "hasChildren": true,
    "isLeaf": false,
    "sortLevel": 3
  },
  {
    "_id": "61cd0db751ba2af6f8dbbff5",
    "createTime": "2021-12-30T01:35:38.816Z",
    "updateTime": "2022-01-05T14:51:58.889Z",
    "menuType": 1,
    "menuName": "用户管理",
    "menuCode": "",
    "path": "/system/user",
    "icon": "x-icon-users",
    "parentId": [
      "61a8879a6c1629c52ece1ece"
    ],
    "menuState": 1,
    "hasChildren": true,
    "isLeaf": false,
    "sortLevel": 4
  },
  {
    "_id": "61cd191b38af4e70f5e92eae",
    "createTime": "2021-12-30T02:23:02.954Z",
    "updateTime": "2021-12-30T03:40:58.411Z",
    "menuType": 1,
    "menuName": "角色管理",
    "menuCode": "",
    "path": "/system/roles",
    "icon": "x-icon-eye-blocked",
    "parentId": [
      "61a8879a6c1629c52ece1ece"
    ],
    "menuState": 1,
    "hasChildren": true,
    "isLeaf": false,
    "sortLevel": 2
  },
  {
    "_id": "61d6445afb88c199fb434f4b",
    "createTime": "2022-01-06T00:59:39.307Z",
    "updateTime": "2022-01-12T02:54:43.005Z",
    "menuType": 1,
    "menuName": "部门管理",
    "menuCode": "",
    "path": "/system/dept",
    "icon": "x-icon-briefcase",
    "parentId": [
      "61a8879a6c1629c52ece1ece"
    ],
    "menuState": 1,
    "hasChildren": true,
    "isLeaf": false,
    "sortLevel": 1
  },
  {
    "_id": "61dd2b1b4d9cce5c62e51335",
    "createTime": "2022-01-11T07:00:08.966Z",
    "updateTime": "2022-01-11T07:00:08.966Z",
    "menuType": 2,
    "menuName": "编辑",
    "menuCode": "user:edit",
    "path": "",
    "icon": "",
    "parentId": [
      "61a8879a6c1629c52ece1ece",
      "61cd0db751ba2af6f8dbbff5"
    ],
    "menuState": 1,
    "hasChildren": false,
    "isLeaf": true,
    "sortLevel": 1
  },
  {
    "_id": "61dd2baa4d9cce5c62e51363",
    "createTime": "2022-01-11T07:00:08.966Z",
    "updateTime": "2022-01-11T07:00:08.966Z",
    "menuType": 2,
    "menuName": "删除",
    "menuCode": "user:delete",
    "path": "",
    "icon": "",
    "parentId": [
      "61a8879a6c1629c52ece1ece",
      "61cd0db751ba2af6f8dbbff5"
    ],
    "menuState": 1,
    "hasChildren": false,
    "isLeaf": true,
    "sortLevel": 1
  },
  {
    "_id": "61dd333098ff83021f3c5165",
    "createTime": "2022-01-11T07:26:30.257Z",
    "updateTime": "2022-01-11T07:26:30.257Z",
    "menuType": 2,
    "menuName": "新增",
    "menuCode": "user:add",
    "path": "",
    "icon": "",
    "parentId": [
      "61a8879a6c1629c52ece1ece",
      "61cd0db751ba2af6f8dbbff5"
    ],
    "menuState": 1,
    "hasChildren": false,
    "isLeaf": true,
    "sortLevel": 1
  },
  {
    "_id": "61dd3e5f98ff83021f3c5e11",
    "createTime": "2022-01-11T07:26:30.257Z",
    "updateTime": "2022-01-11T07:26:30.257Z",
    "menuType": 2,
    "menuName": "新增",
    "menuCode": "menu:add",
    "path": "",
    "icon": "",
    "parentId": [
      "61a8879a6c1629c52ece1ece",
      "61a8d64ef07fa983f5df9b67"
    ],
    "menuState": 1,
    "hasChildren": false,
    "isLeaf": true,
    "sortLevel": 1
  },
  {
    "_id": "61dd3e7998ff83021f3c5e18",
    "createTime": "2022-01-11T07:26:30.257Z",
    "updateTime": "2022-01-11T07:26:30.257Z",
    "menuType": 2,
    "menuName": "编辑",
    "menuCode": "menu:edit",
    "path": "",
    "icon": "",
    "parentId": [
      "61a8879a6c1629c52ece1ece",
      "61a8d64ef07fa983f5df9b67"
    ],
    "menuState": 1,
    "hasChildren": false,
    "isLeaf": true,
    "sortLevel": 1
  },
  {
    "_id": "61dd3e9098ff83021f3c5e21",
    "createTime": "2022-01-11T07:26:30.257Z",
    "updateTime": "2022-01-11T07:26:30.257Z",
    "menuType": 2,
    "menuName": "删除",
    "menuCode": "menu:delete",
    "path": "",
    "icon": "",
    "parentId": [
      "61a8879a6c1629c52ece1ece",
      "61a8d64ef07fa983f5df9b67"
    ],
    "menuState": 1,
    "hasChildren": false,
    "isLeaf": true,
    "sortLevel": 1
  },
  {
    "_id": "61dd3f1798ff83021f3c5ee6",
    "createTime": "2022-01-11T07:26:30.257Z",
    "updateTime": "2022-01-11T07:26:30.257Z",
    "menuType": 2,
    "menuName": "创建",
    "menuCode": "role:add",
    "path": "",
    "icon": "",
    "parentId": [
      "61a8879a6c1629c52ece1ece",
      "61cd191b38af4e70f5e92eae"
    ],
    "menuState": 1,
    "hasChildren": false,
    "isLeaf": true,
    "sortLevel": 1
  },
  {
    "_id": "61dd3f3298ff83021f3c5eef",
    "createTime": "2022-01-11T07:26:30.257Z",
    "updateTime": "2022-01-11T07:26:30.257Z",
    "menuType": 2,
    "menuName": "编辑",
    "menuCode": "role:edit",
    "path": "",
    "icon": "",
    "parentId": [
      "61a8879a6c1629c52ece1ece",
      "61cd191b38af4e70f5e92eae"
    ],
    "menuState": 1,
    "hasChildren": false,
    "isLeaf": true,
    "sortLevel": 1
  },
  {
    "_id": "61dd3f4b98ff83021f3c5ef8",
    "createTime": "2022-01-11T07:26:30.257Z",
    "updateTime": "2022-01-11T07:26:30.257Z",
    "menuType": 2,
    "menuName": "删除",
    "menuCode": "role:delete",
    "path": "",
    "icon": "",
    "parentId": [
      "61a8879a6c1629c52ece1ece",
      "61cd191b38af4e70f5e92eae"
    ],
    "menuState": 1,
    "hasChildren": false,
    "isLeaf": true,
    "sortLevel": 1
  },
  {
    "_id": "61dd3fd098ff83021f3c5f9e",
    "createTime": "2022-01-11T07:26:30.257Z",
    "updateTime": "2022-01-11T07:26:30.257Z",
    "menuType": 2,
    "menuName": "新增",
    "menuCode": "dept:add",
    "path": "",
    "icon": "",
    "parentId": [
      "61a8879a6c1629c52ece1ece",
      "61d6445afb88c199fb434f4b"
    ],
    "menuState": 1,
    "hasChildren": false,
    "isLeaf": true,
    "sortLevel": 1
  },
  {
    "_id": "61dd3fe498ff83021f3c5fa5",
    "createTime": "2022-01-11T07:26:30.257Z",
    "updateTime": "2022-01-11T07:26:30.257Z",
    "menuType": 2,
    "menuName": "编辑",
    "menuCode": "dept:edit",
    "path": "",
    "icon": "",
    "parentId": [
      "61a8879a6c1629c52ece1ece",
      "61d6445afb88c199fb434f4b"
    ],
    "menuState": 1,
    "hasChildren": false,
    "isLeaf": true,
    "sortLevel": 1
  },
  {
    "_id": "61dd3ffe98ff83021f3c5fae",
    "createTime": "2022-01-11T07:26:30.257Z",
    "updateTime": "2022-01-11T07:26:30.257Z",
    "menuType": 2,
    "menuName": "删除",
    "menuCode": "dept:delete",
    "path": "",
    "icon": "",
    "parentId": [
      "61a8879a6c1629c52ece1ece",
      "61d6445afb88c199fb434f4b"
    ],
    "menuState": 1,
    "hasChildren": false,
    "isLeaf": true,
    "sortLevel": 1
  },
  {
    "_id": "61de7681b56c2bfa6d9514c6",
    "createTime": "2022-01-12T02:07:09.330Z",
    "updateTime": "2022-01-12T02:07:09.330Z",
    "menuType": 1,
    "menuName": "休假申请",
    "menuCode": "",
    "path": "/audit/holiday",
    "icon": "x-icon-file-text",
    "parentId": [
      "61a888036c1629c52ece1ed0"
    ],
    "menuState": 1,
    "hasChildren": false,
    "isLeaf": true,
    "sortLevel": 1
  },
  {
    "_id": "61e50c4a5a132acba08b738f",
    "createTime": "2022-01-17T03:01:51.068Z",
    "updateTime": "2022-01-17T03:01:51.068Z",
    "menuType": 1,
    "menuName": "待审批",
    "menuCode": "",
    "path": "/audit/waiting",
    "icon": "x-icon-pacman",
    "parentId": [
      "61a888036c1629c52ece1ed0"
    ],
    "menuState": 1,
    "hasChildren": false,
    "isLeaf": true,
    "sortLevel": 1
  }
]

const roles = [
  {
    "_id": "61d4f88d48f23e20ea14dd09",
    "roleName": "admin",
    "remark": "管理员",
    "permissionList": [
      "61a8879a6c1629c52ece1ece",
      "61a8d64ef07fa983f5df9b67",
      "61dd3e5f98ff83021f3c5e11",
      "61dd3e7998ff83021f3c5e18",
      "61dd3e9098ff83021f3c5e21",
      "61cd191b38af4e70f5e92eae",
      "61dd3f1798ff83021f3c5ee6",
      "61dd3f3298ff83021f3c5eef",
      "61dd3f4b98ff83021f3c5ef8",
      "61a888036c1629c52ece1ed0",
      "61cd0db751ba2af6f8dbbff5",
      "61dd2b1b4d9cce5c62e51335",
      "61dd2baa4d9cce5c62e51363",
      "61dd333098ff83021f3c5165",
      "61d6445afb88c199fb434f4b",
      "61dd3fd098ff83021f3c5f9e",
      "61dd3fe498ff83021f3c5fa5",
      "61dd3ffe98ff83021f3c5fae",
      "61de7681b56c2bfa6d9514c6",
      "61e50c4a5a132acba08b738f"
    ],
    "createTime": "2022-01-05T01:46:16.751Z",
    "updateTime": "2022-01-17T06:27:36.649Z"
  },
  {
    "_id": "61dce87f95767af51c50cb22",
    "roleName": "test",
    "remark": "颠三倒四",
    "permissionList": [
      "61a888036c1629c52ece1ed0"
    ],
    "createTime": "2022-01-11T01:57:53.346Z",
    "updateTime": "2022-01-11T02:16:36.847Z"
  }
]

const depts = [
  {
    "sortLevel": 1,
    "_id": "61dbdea4cb22978c039162fa",
    "parentId": [],
    "deptName": "前端",
    "user": "61a73bf99478014d3f06506f",
    "createTime": "2022-01-10T07:21:52.457Z",
    "updateTime": "2022-01-11T01:13:18.965Z",
    "hasChildren": true,
    "isLeaf": false
  },
  {
    "_id": "61dd21e595767af51c50cb52",
    "parentId": [
      "61dbdea4cb22978c039162fa"
    ],
    "deptName": "h5",
    "user": "61a73bf99478014d3f06506f",
    "createTime": "2022-01-11T01:57:53.347Z",
    "updateTime": "2022-01-11T01:57:53.347Z",
    "hasChildren": true,
    "isLeaf": false,
    "sortLevel": 1
  },
  {
    "_id": "61dd22a095767af51c50cb7a",
    "parentId": [
      "61dbdea4cb22978c039162fa"
    ],
    "deptName": "pc",
    "user": "61a73b179478014d3f065058",
    "createTime": "2022-01-11T01:57:53.347Z",
    "updateTime": "2022-01-11T06:24:40.431Z",
    "hasChildren": false,
    "isLeaf": true,
    "sortLevel": 2
  },
  {
    "_id": "61df9eb1e62c603a9dcea66d",
    "parentId": [
      "61dbdea4cb22978c039162fa",
      "61dd21e595767af51c50cb52"
    ],
    "deptName": "h1",
    "user": "61a73b179478014d3f065058",
    "createTime": "2022-01-13T03:33:07.532Z",
    "updateTime": "2022-01-13T09:04:09.006Z",
    "hasChildren": false,
    "isLeaf": true,
    "sortLevel": 1
  },
  {
    "_id": "61dfeb35e62c603a9dcea727",
    "parentId": [],
    "deptName": "java",
    "user": "61a73b179478014d3f065058",
    "createTime": "2022-01-13T03:33:07.532Z",
    "updateTime": "2022-01-13T03:33:07.532Z",
    "hasChildren": false,
    "isLeaf": true,
    "sortLevel": 1
  },
  {
    "_id": "61e0ecd75e67b74a84acf49a",
    "parentId": [],
    "deptName": "人事",
    "user": "61e0ecc45e67b74a84acf48f",
    "createTime": "2022-01-14T03:00:39.483Z",
    "updateTime": "2022-01-14T03:00:39.483Z",
    "hasChildren": false,
    "isLeaf": true,
    "sortLevel": 1
  },
  {
    "_id": "61e0ed815e67b74a84acf4f7",
    "parentId": [],
    "deptName": "财务",
    "user": "61e0ed705e67b74a84acf4ec",
    "createTime": "2022-01-14T03:00:39.483Z",
    "updateTime": "2022-01-14T03:00:39.483Z",
    "hasChildren": false,
    "isLeaf": true,
    "sortLevel": 1
  }
]

const counters = {
  "_id" : "userId",
  "sequence_val" : 1000001
}

async function dataInit() {
  const users = await User.find({})
  if (users.length <= 0) {
    await User.create(admin)
    await Menu.insertMany(menus)
    await Role.insertMany(roles)
    await Dept.insertMany(depts)
    await Counter.create(counters)
  }
}

module.exports = dataInit
