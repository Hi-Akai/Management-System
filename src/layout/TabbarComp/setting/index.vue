<template>
  <!-- 全屏按钮 -->
  <el-button
    size="small"
    icon="FullScreen"
    circle
    @click="fullScreen"
  ></el-button>
  <!-- 设置按钮 -->
  <el-button size="small" icon="Setting" circle></el-button>
  <!-- 下拉菜单 -->
  <el-dropdown>
    <span class="el-dropdown-link">
      {{ userStore.username }}
      <el-icon class="el-icon--right">
        <arrow-down />
      </el-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
import useUserStore from '@/store/modules/user'
import { useRoute, useRouter } from 'vue-router'
const $router = useRouter()
const $route = useRoute()
const userStore = useUserStore()
/**
 * 全屏
 */
const fullScreen = () => {
  //DOM对象的一个属性：可以用来判断当前是不是全屏模式【全屏：true】
  let full = document.fullscreenElement
  if (!full) {
    document.documentElement.requestFullscreen()
  } else {
    document.exitFullscreen()
  }
}
/**
 * 用户登出
 * 1.向服务器发请求，告诉服务器本次token变为失效============TODO
 * 2.清空用户仓库中关于用户的信息
 * 3.跳转到登录页面
 */
const logout = async () => {
  await userStore.userLogout()
  $router.push({ path: '/login', query: { redirect: $route.path } })
}
</script>
<script lang="ts">
export default {
  name: 'Setting',
}
</script>

<style lang="scss" scoped>
.el-dropdown-link {
  padding: 0 20px;
}
</style>
