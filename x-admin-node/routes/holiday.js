const router = require('koa-router')()
const Holiday = require('../models/holidaySchema')
const util = require('../utils/util')
const User = require("../models/userSchema");
const Dept = require("../models/deptSchema");
const dayjs = require("dayjs");

router.prefix('/api/leave')

const applyTypeMap = {
  1: '事假',
  2: '调休',
  3: '年假'
}

const applyStateMap = {
  1: '待审批',
  2: '审批中',
  3: '审批拒绝',
  4: '审批通过',
  5: '作废'
}

router.get('/list', async (ctx) => {
  const { page, skipIndex } = util.pager(ctx.request.query)
  try {
    const user = ctx.state.user.data
    const params = util.deleteEmpty(ctx.request.query)
    const nowUser = await User.findOne({ userId: user.userId })
    params.applyUser = nowUser._id
    const query = Holiday.find(params)
    query.populate('applyUser')
    query.populate('curAuditUser', 'userName -_id')
    const list = await query.skip(skipIndex).limit(page.pageSize)
    const total = await Holiday.count(params)

    list.forEach(item => {
      item._doc.createTime = dayjs(item.createTime).format('YYYY-MM-DD HH:mm:ss')
      item._doc.lastLoginTime = dayjs(item.lastLoginTime).format('YYYY-MM-DD HH:mm:ss')
      item._doc.applyTypeLabel = applyTypeMap[item.applyType]
      item._doc.applyStateLabel = applyStateMap[item.applyState]
    })

    ctx.body = util.success({
      page: {
        ...page,
        total
      },
      list
    })
  } catch (err) {
    ctx.body = util.fail(`查询异常：${err.stack}`)
  }
})

router.post('/operate', async (ctx) => {
  const { action, params, _id }  = ctx.request.body
  try {
    if (action === 'add') {
      const count = await Holiday.count({})
      params.orderNo = `XJ${dayjs().format('YYYYMMDD')}${count}`
      const user = ctx.state.user.data
      const nowUser = await User.findOne({ userId: user.userId })
      const { user: curAuditUser } = await Dept.findOne({ _id: user.deptId }, { user: 1 }).populate('user')
      const res = await Holiday.create({
        ...params,
        applyUser: nowUser._id,
        curAuditUser: curAuditUser._id,
        auditUsers: [curAuditUser._id, '61e0ecc45e67b74a84acf48f', '61e0ed705e67b74a84acf4ec']
      })
      ctx.body = util.success(res)
    } else {
      const res = await Holiday.findByIdAndUpdate(_id, { applyState: 5, updateTime: Date.now() })
      ctx.body = util.success(res)
    }
  } catch (err) {
    ctx.body = util.fail(`异常：${err.stack}`)
  }
})

router.get('/waiting', async (ctx) => {
  const { page, skipIndex } = util.pager(ctx.request.query)
  try {
    const user = ctx.state.user.data
    const params = util.deleteEmpty(ctx.request.query)
    const nowUser = await User.findOne({ userId: user.userId })
    const query = Holiday.find({ ...params, auditUsers: { $all: [nowUser._id] } })
    query.populate('applyUser')
    query.populate('auditFlows', 'userName userId -_id')
    query.populate('curAuditUser', 'userName userId -_id')
    const list = await query.skip(skipIndex).limit(page.pageSize)
    const total = await Holiday.count({ ...params, auditUsers: { $all: [nowUser._id] } })

    list.forEach(item => {
      item._doc.createTime = dayjs(item.createTime).format('YYYY-MM-DD HH:mm:ss')
      item._doc.lastLoginTime = dayjs(item.lastLoginTime).format('YYYY-MM-DD HH:mm:ss')
      item._doc.applyTypeLabel = applyTypeMap[item.applyType]
      item._doc.applyStateLabel = applyStateMap[item.applyState]
      item._doc.auditFlowsNames = item.auditFlows.map(item => item.userName).join(',')
    })

    ctx.body = util.success({
      page: {
        ...page,
        total
      },
      list
    })
  } catch (err) {
    ctx.body = util.fail(`查询异常：${err.stack}`)
  }
})

router.post('/approval', async (ctx) => {
  const { _id, pass } = ctx.request.body
  try {
    const user = ctx.state.user.data
    const nowUser = await User.findOne({ userId: user.userId })
    const holiday = await Holiday.findById(_id)
    const step = holiday.auditUsers.findIndex(item => item.toString() === nowUser._id.toString())
    const total = holiday.auditUsers.length - 1
    const updateData = {
      auditFlows: [...holiday._doc.auditFlows, nowUser._id]
    }
    if (step === total) {
      updateData.applyState = pass ? 4 : 3
    } else {
      updateData.applyState = pass ? 2 : 3
      updateData.curAuditUser = step === total ? nowUser._id : holiday.auditUsers[step + 1]
    }
    const res = await Holiday.findByIdAndUpdate(_id, updateData)
    ctx.body = util.success(res)
  } catch (err) {
    ctx.body = util.fail(`查询异常：${err.stack}`)
  }
})

router.get('/count', async (ctx) => {
  try {
    const user = ctx.state.user.data
    const nowUser = await User.findOne({ userId: user.userId })
    const count = await Holiday.count({ curAuditUser: nowUser._id, applyState: { $lte: 2 } })
    ctx.body = util.success(count)
  } catch (err) {
    ctx.body = util.fail(`查询异常：${err.stack}`)
  }
})

module.exports = router
