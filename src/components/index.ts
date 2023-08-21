import SvgIcon from './SvgIcon/index.vue'
import type { App, Component } from 'vue'

const components: { [name: string]: Component } = { SvgIcon }

//对外暴露插件对象
export default {
  //务必叫做install方法
  install(app: App) {
    Object.keys(components).forEach((key: string) => {
      app.component(key, components[key])
    })
  },
}
