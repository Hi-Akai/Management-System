import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

//引入svg需要用到的插件
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

import path from 'path'

//引入mock插件提供的方法
// import { viteMockServe } from 'vite-plugin-mock'

export default defineConfig(({ mode }) => {
  //获取各个环境下配置的对应的变量
  //mode加载的环境的文件，process.cwd()环境所在位置
  const env = loadEnv(mode, process.cwd())
  return {
    plugins: [
      vue(),
      createSvgIconsPlugin({
        // Specify the icon folder to be cached
        iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
        // Specify symbolId format
        symbolId: 'icon-[dir]-[name]',
      }),
      // viteMockServe({
      //   localEnabled: command === 'serve', //保证开发阶段可以使用mock接口
      // }),
    ],
    resolve: {
      alias: {
        '@': path.resolve('./src'), // 相对路径别名配置，使用 @ 代替 src
      },
    },
    //scss全局变量的配置
    css: {
      preprocessorOptions: {
        scss: {
          javascriptEnabled: true,
          additionalData: '@import "./src/styles/variable.scss";',
        },
      },
    },
    //代理跨域
    server: {
      proxy: {
        [env.VITE_APP_BASE_API]: {
          //获取数据的服务器地址设置
          target: env.VITE_SERVE,
          //需要代理跨域
          changeOrigin: true,
          //路径重写
          // rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
  }
})
