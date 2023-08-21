<template>
  <div id="box">1234556</div>
  <el-button type="primary" icon="Edit">Primary</el-button>
  <el-icon class="is-loading">
    <Loading />
  </el-icon>
  <svg-icon name="home"></svg-icon>
</template>

<script setup lang="ts">
import request from '@/utils/request'
import { onMounted } from 'vue'

onMounted(() => {
  request({
    url: '/user/login',
    method: 'post',
    data: {
      username: 'admin',
      password: '111111',
    },
  }).then((res) => {
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
