/**
 * 菜单
 */
const mongoose = require('mongoose')
const dayjs = require("dayjs");

const schema = {
  "createTime": {
    type: Date,
    default: Date.now()
  },//创建时间
  "updateTime": {
    type: Date,
    default: Date.now()
  },
  menuType: { // 1.菜单 2.按钮
    type: Number,
    default: 1
  },
  menuName: String,
  menuCode: String, // 权限标识
  path: String,
  icon: String,
  parentId: [mongoose.Types.ObjectId],
  menuState: { // 1.启用，2.禁用
    type: Number,
    default: 1
  },
  hasChildren: {
    type: Boolean,
    default: false
  },
  isLeaf: {
    type: Boolean,
    default: true
  },
  sortLevel: {
    type: Number,
    default: 1
  }
}

const Menus = mongoose.model('menus', mongoose.Schema(schema))

module.exports = Menus
