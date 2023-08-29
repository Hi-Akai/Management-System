//layout组件相关小仓库
import { defineStore } from 'pinia'
import type { SettingState } from './types/type'

const useLayoutSetStore = defineStore('Setting', {
  state: (): SettingState => {
    return {
      isFold: false,
    }
  },
  actions: {
    //切换菜单栏展开状态
    changeFold() {
      this.isFold = !this.isFold
    },
  },
  getters: {},
})

export default useLayoutSetStore
