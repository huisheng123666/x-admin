const Menu = require("../models/menuSchema");

async function deepMenu(menu) {
  const parentId = [...menu.parentId, menu._id]
  menu.children = await Menu.find({parentId}).sort({ sortLevel: -1 })
  for (let i = 0; i < menu.children.length; i++) {
    await deepMenu(menu.children[i]._doc)
  }
}

function deleteRepeat(root, children) {
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

async function genHasChildChildren(type = 'add', parentId = []) {
  if (!parentId.length) return
  const parent = parentId[parentId.length - 1]
  if (type === 'add') {
    await Menu.findByIdAndUpdate(parent, {
      hasChildren: true,
      isLeaf: false
    })
  } else {
    const children = await Menu.find({ parentId })
    await Menu.findByIdAndUpdate(parent, {
      hasChildren: children.length > 0,
      isLeaf: children.length === 0
    })
  }
}

async function deepUserMenu(menu, permission = {}) {
  const parentId = [...menu.parentId, menu._id]
  const children = await Menu.find({parentId}).sort({ sortLevel: -1 })
  menu.children = children.filter(item => permission[item._id])
  for (let i = 0; i < menu.children.length; i++) {
    await deepMenu(menu.children[i]._doc)
  }
}

module.exports = {
  deepMenu,
  deleteRepeat,
  genHasChildChildren,
  deepUserMenu
}
