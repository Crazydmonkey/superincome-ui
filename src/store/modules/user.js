import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import router, { resetRouter } from '@/router'
import request from '@/utils/http/index'
import { get, post } from '@/utils/http/index'
const state = {
  token: getToken(),
  name: '',
  avatar: '',
  introduction: '',
  roles: [],
  userInfo: {},
  tableData: [],
  total: 20,
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
  SetWaiter(state, data) {
    state.waiter = data;
  },
  SetUserInfo(state, data) {
    state.userInfo = data;
  },
  setTable(state, data) {
    state.tableData = data;
  },
  setTotal(state, data) {
    state.total = data;
  }
}

const actions = {
  // user login
  async  findAllWaiter(context, data) {
    let response = await get('/getAllBusinessPageInfo',data);
    console.log(response, 'aaa')
    context.commit("setTable", response.data.list);
    context.commit("setTotal", response.data.total);
    return response;
  },
  async deleteWaiter(context, data) {
    let response = await request.delete("/business/" + data);
    console.log(response, "ssssss")
    // commit("resetOrders",response.data);
    context.dispatch("findAllWaiter", data.form)
    return response;
  },
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ account: username.trim(), password: password }).then(response => {
        const { data } = response
        commit('SET_TOKEN', data.token)
        setToken(data.token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const { data } = response
        console.log(data, "-------------------------")
        if (!data) {
          reject('Verification failed, please Login again.')
        }

        const { account, headPortrait, introduction } = data
        if (account == 'boss') {
          var roles = ['boss']
        } else {
          var roles = ['waiter']
        }
        // roles must be a non-empty array
        if (!roles || roles.length <= 0) {
          reject('getInfo: roles must be a non-null array!')
        }

        commit('SET_ROLES', roles)
        commit('SET_NAME', account)
        commit('SET_AVATAR', "http://192.168.1.73:8889/image/" + headPortrait)
        commit('SET_INTRODUCTION', introduction)
        commit('SetUserInfo', data)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state, dispatch }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        commit('SetUserInfo', {})
        removeToken()
        resetRouter()

        // reset visited views and cached views
        // to fixed https://github.com/PanJiaChen/vue-element-admin/issues/2485
        dispatch('tagsView/delAllViews', null, { root: true })

        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
      resolve()
    })
  },

  // dynamically modify permissions
  changeRoles({ commit, dispatch }, role) {
    return new Promise(async resolve => {
      const token = role + '-token'

      commit('SET_TOKEN', token)
      setToken(token)

      const { roles } = await dispatch('getInfo')

      resetRouter()

      // generate accessible routes map based on roles
      const accessRoutes = await dispatch('permission/generateRoutes', roles, { root: true })

      // dynamically add accessible routes
      router.addRoutes(accessRoutes)

      // reset visited views and cached views
      dispatch('tagsView/delAllViews', null, { root: true })

      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
