/**
 * 休假申请
 */
const mongoose = require('mongoose')

const schema = {
  orderNo: String,
  applyType: Number,
  startTime: String,
  applyState: {
    type: Number,
    default: 1
  },
  endTime: String,
  applyUser: {
    type: String,
    ref: 'users'
  },
  leaveTime: String,
  reasons: String,
  auditUsers: {
    type: [mongoose.Types.ObjectId],
    ref: 'users'
  },
  curAuditUser: {
    type: String,
    ref: 'users'
  },
  auditFlows: {
    type: [mongoose.Types.ObjectId],
    ref: 'users'
  },
  "createTime": {
    type: Date,
    default: Date.now()
  },
  "updateTime": {
    type: Date,
    default: Date.now()
  }
}

const Holiday = mongoose.model('holiday', mongoose.Schema(schema))

module.exports = Holiday
