//用户相关小仓库
import { defineStore } from 'pinia'
import { reqLogin } from '@/api/user/index'
import type { loginForm } from '@/api/user/type'

const useUserStore = defineStore('User', {
  state: () => {
    return {
      token: localStorage.getItem('TOKEN'),
    }
  },
  actions: {
    //用户登录
    async userLogin(data: loginForm) {
      const result: any = await reqLogin(data)
      if (result.code == 200) {
        //由于pinia | vuex 存储数据是利用js对象，不持久
        this.token = result.data.token
        localStorage.setItem('TOKEN', result.data.token)
        return 'ok'
      } else {
        return Promise.reject(new Error(result.data.message))
      }
    },
  },
  getters: {},
})

export default useUserStore
