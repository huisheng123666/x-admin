export function deleteBtnMenu(menus: any[]) {
  if (!menus) return []
  const res = []
  for (let i = 0; i < menus.length; i++) {
    if (menus[i].menuType === 1) {
      res.push({
        ...menus[i]
      })
      menus[i].children = menus[i].children && menus[i].children.length ? deleteBtnMenu(menus[i].children) : null
    }
  }
  return res
}
