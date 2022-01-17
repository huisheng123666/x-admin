/**
 * 角色
 */
const mongoose = require('mongoose')

const schema = {
  roleName: String,
  remark: String,
  permissionList: Array,
  "createTime": {
    type: Date,
    default: Date.now()
  },
  "updateTime": {
    type: Date,
    default: Date.now()
  }
}

const Role = mongoose.model('role', mongoose.Schema(schema))

module.exports = Role
