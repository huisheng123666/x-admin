const router = require('koa-router')()
const User = require('../models/userSchema')
const Counter = require('../models/counterSchema')
const util = require('../utils/util')
const jwt = require('jsonwebtoken')
const dayjs = require('dayjs')
const md5 = require('md5')

router.prefix('/api/users')

router.post('/login', async (ctx) => {
  try {
    const { userName, userPwd } = ctx.request.body
    const res = await User.findOne({
      userName,
      userPwd: md5(userPwd)
    }, { _id: 0, userPwd: 0 })
    if (res) {
      const token = jwt.sign({
        data: res._doc
      }, 'xmw', { expiresIn: '24h' })
      ctx.body = util.success({
        ...res._doc,
        token
      })
    } else {
      ctx.body = util.fail('账号或密码不正确')
    }
  } catch (err) {
    ctx.body = util.fail(err.message)
  }
})

router.get('/list', async (ctx) => {
  const { userId, userName, state } = ctx.request.query
  const { page, skipIndex } = util.pager(ctx.request.query)
  const params = {}
  if (userId) {
    params.userId = userId
  }
  if (userName) {
    params.userName = userName
  }
  if (state && state !== '0') {
    params.state = state
  }
  try {
    const filterParams = { ...params, isDelete: false }
    const query = User.find(filterParams, { _id: 0, userPwd: 0 })
    const list = await query.skip(skipIndex).limit(page.pageSize)
    const total = await User.count(filterParams)

    list.forEach(item => {
      item._doc.createTime = dayjs(item.createTime).format('YYYY-MM-DD HH:mm:ss')
      item._doc.lastLoginTime = dayjs(item.lastLoginTime).format('YYYY-MM-DD HH:mm:ss')
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

router.post('/delete', async (ctx) => {
  const { userIds } = ctx.request.body
  const res = await User.updateMany({ userId: { $in: userIds } }, { isDelete: true })
  if (res.modifiedCount) {
    ctx.body = util.success(res)
    return
  }
  ctx.body = util.fail('删除失败')
})

async function validateName(userName, userId) {
  if (userId) {
    const self = await User.findOne({ userId })
    if (self.userName === userName) {
      return true
    }
    const another = await User.findOne({ userName: userName + '1212' })
    if (another) {
      return false
    }
  }
  const another = await User.findOne({ userName })
  return !another
}

router.post('/operate', async (ctx) => {
  const { userId, userName } = ctx.request.body
  const isNamePass = await validateName(userName, userId)
  try {
    if (!isNamePass) {
      ctx.body = util.fail('用户名已存在')
      return
    }
    if (userId) {
      const res = await User.findOneAndUpdate({ userId }, ctx.request.body)
      ctx.body = util.success(res)
    } else {
      const res = await Counter.findOneAndUpdate({ _id: 'userId' }, { $inc: { sequence_val: 1 } }, { new: true })
      const newRes = await User.create({
        userId: res.sequence_val,
        ...ctx.request.body,
        userPwd: md5('123456')
      })
      ctx.body = util.success(newRes)
    }
  } catch (err) {
    ctx.body = util.fail(err.stack)
  }
})

router.get('/userinfo', async (ctx) => {
  try {
    const user = ctx.state.user.data
    const nowUser = await User.findOne({ userId: user.userId })
    ctx.body = util.success(nowUser)
  } catch (e) {
    ctx.body = util.fail(e.stack)
  }
})

router.get('/all', async (ctx) => {
  try {
    const user = await User.find({ isDelete: false, state: { $ne: 2 } })
    ctx.body = util.success(user)
  } catch (e) {
    ctx.body = util.fail(e.stack)
  }
})

module.exports = router
