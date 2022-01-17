export interface BreadCrumbItem {
  name: string
  path?: string
}

const cacheList: {
  [key: string]: BreadCrumbItem[]
} = {
  '/': []
}

let list: BreadCrumbItem[] = []

export const genBreadList = (menus: any[], path: string) => {
  if (cacheList[path]) {
    return cacheList[path]
  }
  list = []
  for (let i = 0, len = menus.length; i < len; i++) {
    searchMenu(menus[i], path)
  }

  return list
}

const searchMenu = (menu: any, path: string, res: BreadCrumbItem[] = []) => {
  if (path === menu.path) {
    list = [
      ...res,
      { name: menu.menuName }
    ]
    cacheList[path] = list
  } else if (menu.menuType === 1) {
    res = [
      ...res,
      {
        name: menu.menuName
      }
    ]
    if (menu.children && menu.children.length) {
      for (let i = 0, len = menu.children.length; i < len; i++) {
        searchMenu(menu.children[i], path, res)
      }
    }
  }
}

export default genBreadList
