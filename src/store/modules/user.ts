//用户相关小仓库
import { defineStore } from 'pinia'
import { reqLogin } from '@/api/user/index'
import type { loginForm, loginRes } from '@/api/user/type'
import type { UserState } from './types/type'
import { SET_TOKEN, GET_TOKEN } from '@/utils/token'

const useUserStore = defineStore('User', {
  state: (): UserState => {
    return {
      token: GET_TOKEN(),
    }
  },
  actions: {
    //用户登录
    async userLogin(data: loginForm) {
      const result: loginRes = await reqLogin(data)
      if (result.code == 200) {
        //由于pinia | vuex 存储数据是利用js对象，不持久
        this.token = result.data.token as string
        SET_TOKEN(result.data.token as string)
        return 'ok'
      } else {
        return Promise.reject(new Error(result.data.message))
      }
    },
  },
  getters: {},
})

export default useUserStore
