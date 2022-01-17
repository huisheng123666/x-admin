const router = require('koa-router')()
const Menu = require('../models/menuSchema')
const Role = require('../models/roleSchema')
const util = require('../utils/util')
const dayjs = require('dayjs')
const md5 = require('md5')
const User = require("../models/userSchema");
const { deepMenu, deleteRepeat, genHasChildChildren, deepUserMenu } = require('../utils/menuHelper')

router.prefix('/api/menu')

router.get('/list', async (ctx) => {
  const { menuName = '', menuState } = ctx.request.query
  const params = {
    // parentId: []
    $or: [{ menuName: new RegExp(menuName, 'i') }]
  }
  // if (menuName) params.menuName = menuName
  if (menuState) params.menuState = menuState
  try {
    const res = await Menu.find(params).sort({ sortLevel: -1 })
    deleteRepeat(res, res)
    ctx.body = util.success({
      page: {
        pageNum: 1,
        pageSize: 10
      },
      list: res.map(item => {
        return {
          ...item._doc,
          createTime: dayjs(item.createTime).format('YYYY-MM-DD HH:mm:ss')
        }
      })
    })
  } catch (err) {
    ctx.body = util.fail(err.stack)
  }
})

router.get('/all', async (ctx) => {
  try {
    const root = await Menu.find({ parentId: [] }).sort({ sortLevel: -1 })
    for (let i = 0; i < root.length; i++) {
      await deepMenu(root[i]._doc)
    }
    ctx.body = util.success(root)
  } catch (err) {
    ctx.body = util.fail(err.stack)
  }
})

router.post('/children', async (ctx) => {
  const { parentId } = ctx.request.body
  try {
    const res = await Menu.find({ parentId }).sort({ sortLevel: -1 })
    ctx.body = util.success(res.map(item => {
      return {
        ...item._doc,
        createTime: dayjs(item.createTime).format('YYYY-MM-DD HH:mm:ss')
      }
    }))
  } catch (err) {
    ctx.body = util.fail(err.stack)
  }
})

router.post('/default', async (ctx) => {
  const { parentId = [] } = ctx.request.body
  const allMenu = await Menu.find({ parentId: [] }).sort({ sortLevel: -1 })
  if (!parentId.length) {
    ctx.body = util.success(allMenu)
    return
  }
  let parent = allMenu.find(item => item._id.toString() === parentId[0])
  for (let i = 1; i <= parentId.length; i++) {
    parent._doc.children = await Menu.find({ parentId: parentId.slice(0, i) }).sort({ sortLevel: -1 })
    parent = parent._doc.children.find(item => item._id.toString() === parentId[i])
  }
  ctx.body = util.success(allMenu)
})

router.post('/operate', async (ctx) => {
  const { _id, action, params } = ctx.request.body
  try {
    if (action === 'add') {
      const res = await Menu.create({
        ...params
      })
      await genHasChildChildren('add', params.parentId)
      ctx.body = util.success(res, '创建成功')
    } else if (action === 'edit') {
      params.updateTime = new Date()
      const res = await Menu.findByIdAndUpdate(_id, params)
      ctx.body = util.success(res, '编辑成功')
    } else {
      const res = await Menu.findByIdAndRemove(_id)
      await genHasChildChildren('delete', res.parentId)
      // 只要包含即可查出
      await Menu.deleteMany({ parentId: { $all: [_id] } })
      ctx.body = util.success(res, '删除成功')
    }
  } catch (err) {
    ctx.body = util.fail(err.stack)
  }
})

router.get('/child/keys', async (ctx) => {
  const { id } = ctx.request.query
  try {
    const menus = await Menu.find({ parentId: { $all: [id] } })
    ctx.body = util.success(menus.map(item => item._id))
  } catch (e) {
    ctx.body = util.fail(e.stack)
  }
})

router.get('/user', async (ctx) => {
  try {
    const user = ctx.state.user.data
    const nowUser = await User.findOne({ userId: user.userId })
    const roles = await Role.find({ _id: { $in: nowUser.roleList } })
    let permissions = []
    roles.forEach(item => {
      permissions = [...permissions, ...item.permissionList]
    })
    const btns = await Menu.find({ _id: { $in: permissions }, menuType: 2 })
    const permissionMap = {}
    permissions.forEach(item => {
      permissionMap[item] = true
    })
    let root = await Menu.find({ parentId: [] }).sort({ sortLevel: -1 })
    root = root.filter(item => permissionMap[item._id])
    for (let i = 0; i < root.length; i++) {
      await deepUserMenu(root[i]._doc, permissionMap)
    }
    ctx.body = util.success({
      menus: root,
      btns
    })
  } catch (e) {
    util.fail(e.stack)
  }
})

router.post('/check', async (ctx) => {
  const { path } = ctx.request.body
  try {
    const user = ctx.state.user.data
    const nowUser = await User.findOne({ userId: user.userId })
    const menu = await Menu.findOne({ path })
    const roles = await Role.find({ _id: { $in: nowUser.roleList }, permissionList: { $all: [menu._id.toString()] } })
    ctx.body = util.success(roles.length > 0)
  } catch (e) {
    util.fail(e.stack)
  }
})

module.exports = router
