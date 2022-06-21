/**
 * 部门
 */
const mongoose = require('mongoose')
const dayjs = require('dayjs')

const schema = {
  parentId: [{ type: mongoose.Types.ObjectId }],
  deptName: String,
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'users'
  },
  "createTime": {
    type: Date,
    default: Date.now()
  },//创建时间
  "updateTime": {
    type: Date,
    default: Date.now()
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

const Dept = mongoose.model('dept', mongoose.Schema(schema))

module.exports = Dept
