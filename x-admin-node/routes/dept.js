const router = require('koa-router')()
const Dept = require('../models/deptSchema')
const User = require('../models/userSchema')
const util = require("../utils/util");
const dayjs = require("dayjs");
const Role = require("../models/roleSchema");

router.prefix('/api/dept')

async function genHasDeptChildren(type = 'add', parentId = []) {
  if (!parentId.length) return
  const parent = parentId[parentId.length - 1]
  if (type === 'add') {
    await Dept.findByIdAndUpdate(parent, {
      hasChildren: true,
      isLeaf: false
    })
  } else {
    const children = await Dept.find({ parentId })
    await Dept.findByIdAndUpdate(parent, {
      hasChildren: children.length > 0,
      isLeaf: children.length === 0
    })
  }
}

function deleteDeptRepeat(root, children) {
  if (!root) return
  for (let i = 0; i < children.length; i++) {
    const isInclude = root.some(item => {
      return children[i].parentId.includes(item._id)
    })
    if (isInclude) {
      root.splice(i, 1)
      i--
    }
  }
}

router.post('/operate', async (ctx) => {
  const { action, params, _id } = ctx.request.body
  if (action === 'add') {
    const res = await Dept.create({
      ...params
    })
    await genHasDeptChildren('add', params.parentId)
    ctx.body = util.success(res, '创建成功')
  } else if (action === 'edit') {
    params.updateTime = new Date()
    const res = await Dept.findByIdAndUpdate(_id, params)
    ctx.body = util.success(res, '编辑成功')
  } else {
    const users = await User.find({ deptId: { $all: [_id] }, isDelete: false })
    if (users.length > 0) {
      ctx.body = util.fail('有用户属于该部门，请先取消关联')
      return
    }
    const res = await Dept.findByIdAndRemove(_id)
    await genHasDeptChildren('delete', res.parentId)
    // 只要包含即可查出
    await Dept.deleteMany({ parentId: { $all: [_id] } })
    ctx.body = util.success(res, '删除成功')
  }
})


router.get('/list', async (ctx) => {
  const { deptName = '' } = ctx.request.query
  const params = {
    $or: [{ deptName: new RegExp(deptName, 'i') }]
  }
  try {
    const res = await Dept.find(params).populate('user', 'userName')
    deleteDeptRepeat(res, res)
    ctx.body = util.success({
      page: {
        pageNum: 1,
        pageSize: 10
      },
      list: res.map(item => {
        return {
          ...item._doc,
          createTime: dayjs(item.createTime).format('YYYY-MM-DD HH:mm:ss'),
          updateTime: dayjs(item.updateTime).format('YYYY-MM-DD HH:mm:ss')
        }
      })
    })
  } catch (err) {
    ctx.body = util.fail(err.stack)
  }
})

async function deepDept(dept) {
  const parentId = [...dept.parentId, dept._id]
  dept.children = await Dept.find({parentId}).sort({ sortLevel: -1 })
  for (let i = 0; i < dept.children.length; i++) {
    await deepDept(dept.children[i]._doc)
  }
}

router.get('/all', async (ctx) => {
  try {
    const root = await Dept.find({ parentId: [] }).sort({ sortLevel: -1 })
    for (let i = 0; i < root.length; i++) {
      await deepDept(root[i]._doc)
    }
    ctx.body = util.success(root)
  } catch (err) {
    ctx.body = util.fail(err.stack)
  }
})

router.post('/children', async (ctx) => {
  const { parentId } = ctx.request.body
  try {
    const res = await Dept.find({ parentId }).sort({ sortLevel: -1 }).populate('user', 'userName')
    ctx.body = util.success(res.map(item => {
      return {
        ...item._doc,
        createTime: dayjs(item.createTime).format('YYYY-MM-DD HH:mm:ss'),
        updateTime: dayjs(item.updateTime).format('YYYY-MM-DD HH:mm:ss')
      }
    }))
  } catch (err) {
    ctx.body = util.fail(err.stack)
  }
})

router.post('/default', async (ctx) => {
  const { parentId = [] } = ctx.request.body
  const allMenu = await Dept.find({ parentId: [] }).sort({ sortLevel: -1 })
  if (!parentId.length) {
    ctx.body = util.success(allMenu)
    return
  }
  let parent = allMenu.find(item => item._id.toString() === parentId[0])
  for (let i = 1; i <= parentId.length; i++) {
    parent._doc.children = await Dept.find({ parentId: parentId.slice(0, i) }).sort({ sortLevel: -1 })
    parent = parent._doc.children.find(item => item._id.toString() === parentId[i])
  }
  ctx.body = util.success(allMenu)
})

router.get('/init', async (ctx) => {
  const menus = await Dept.find({}, { __v: 0 })
  ctx.body = util.success(menus)
})


module.exports = router
