const router = require('koa-router')()
const Role = require('../models/roleSchema')
const util = require('../utils/util')
const dayjs = require("dayjs");
const User = require("../models/userSchema");
const Menu = require("../models/menuSchema");

router.prefix('/api/roles')

router.get('/all', async (ctx) => {
  try {
    const list = await Role.find({}, "_id roleName")
    ctx.body = util.success(list)
  } catch (e) {
    ctx.body = util.fail(e.stack)
  }
})

router.get('/list', async (ctx) => {
  const { roleName } = ctx.request.query
  const { page, skipIndex } = util.pager(ctx.request.query)
  try {
    const params = {$or: [{ roleName: new RegExp(roleName, 'i') }]}

    const query = Role.find(params)
    const list = await query.skip(skipIndex).limit(page.pageSize)
    const total = await User.count(params)

    list.forEach(item => {
      item._doc.createTime = dayjs(item.createTime).format('YYYY-MM-DD HH:mm:ss')
    })

    ctx.body = util.success({
      page: {
        ...page,
        total
      },
      list
    })
  } catch (e) {
    ctx.body = util.fail(e.stack)
  }
})

router.post('/operate', async (ctx) => {
  const { action, _id, remark, roleName } = ctx.request.body
  try {
    if (action === 'add') {
      const res = await Role.create({
        remark,
        roleName
      })
      ctx.body = util.success(res, '创建成功')
    } else if (action === 'edit') {
      const res = await Role.findByIdAndUpdate(_id, {
        remark,
        roleName,
        updateTime: new Date()
      })
      ctx.body = util.success(res, '编辑成功')
    } else {
      const users = await User.find({ roleList: { $all: [_id] }, isDelete: false })
      if (users.length > 0) {
        ctx.body = util.fail('有用户在使用改角色，请先取消关联')
        return
      }
      const res = await Role.findByIdAndRemove(_id)
      ctx.body = util.success(res, '删除成功')
    }
  } catch (err) {
    ctx.body = util.fail(err.stack)
  }
})

router.post('/permission', async (ctx) => {
  const { permissionList, _id } = ctx.request.body
  try {
    const res = await Role.findByIdAndUpdate(_id, {
      permissionList,
      updateTime: new Date()
    })
    ctx.body = util.success(res, '权限设置成功')
  } catch (e) {
    ctx.body = util.fail(err.stack)
  }
})

module.exports = router

