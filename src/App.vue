<template>
  <div id="box">1234556</div>
  <el-button type="primary" icon="Edit">Primary</el-button>
  <el-icon class="is-loading">
    <Loading />
  </el-icon>
  <svg-icon name="home"></svg-icon>
</template>

<script setup lang="ts">
import { reqLogin } from '@/api/user/index'
import { onMounted } from 'vue'

onMounted(() => {
  reqLogin({
    username: 'admin',
    password: '111111',
  }).then((res: any) => {
    console.log(res)
  })
})
</script>

<style lang="scss" scoped>
#box {
  width: 200px;
  background-color: $color;
}
</style>
