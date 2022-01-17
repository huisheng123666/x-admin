export interface User {
  userId: string
  userName: string
  userPwd: string
  userEmail: string
  mobile: string
  sex: number
  deptId: number[]
  job: string
  state: string
  role: Number
  roleList: string[]
  createTime: string
  lastLoginTime: string
  remark?: string
  token: string
}

export interface Menu {
  createTime: string
  updateTime: string
  menuType: 1 | 2
  menuName: string
  menuCode: string
  path: string
  icon: string
  parentId: string[]
  menuState: 1 | 2
  hasChildren: boolean
  isLeaf: boolean
  sortLevel: number
  children?: Menu[]
}
