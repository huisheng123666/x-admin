import { createStore } from 'vuex'
import { Menu, User } from '@/types';
import service from '@/utils/request';

interface Roles {
  originVal: any[]
  mapVal: {
    [key: string]: any
  }
}

interface State {
  userinfo: User | null,
  menus: Menu[]
  roles: Roles | null
  btns: {
    [key: string]: Menu
  }
}

// 创建一个新的 store 实例
const store = createStore<State>({
  state() {
    return {
      userinfo: null,
      menus: [],
      roles: null,
      btns: {}
    }
  },
  mutations: {
    saveUserinfo(state, userinfo) {
      state.userinfo = userinfo
    },
    changeMenus(state, menus) {
      state.menus = menus
    },
    changeRoles(state, roles = []) {
      const mapVal: any = {}
      roles.forEach((item: any) => {
        mapVal[item._id] = item
      })
      state.roles = {
        originVal: roles,
        mapVal: mapVal
      }
    },
    changeBtns(state, btns) {
      state.btns = btns
    }
  },
  actions: {
    getMenus({ commit }) {
      return service.get<any, {
        menus: Menu[]
        btns: Menu[]
      }>('/menu/user')
        .then(data => {
          commit('changeMenus', data.menus)
          const btns: {
            [key: string]: Menu
          } = {}
          data.btns.forEach(item => {
            btns[item.menuCode] = item
          })
          commit('changeBtns', btns)
        })
    },
    getRoles({ commit }) {
      return service.get<any, any[]>('/roles/all')
        .then(data => {
          commit('changeRoles', data)
        })
    },
    getUserinfo({ commit }) {
      return service.get<any, User>('/users/userinfo')
        .then(data => {
          commit('saveUserinfo', data)
        })
    }
  }
})

export default store
