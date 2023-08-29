<template>
  <el-icon style="margin-right: 10px" size="20" color="red">
    <component
      :is="layoutSetStore.isFold ? 'Fold' : 'Expand'"
      @click="changeFold"
    ></component>
  </el-icon>
  <el-breadcrumb :separator-icon="'ArrowRight'">
    <el-breadcrumb-item :to="{ path: '/' }">主页</el-breadcrumb-item>
    <el-breadcrumb-item>客户管理</el-breadcrumb-item>
    <el-breadcrumb-item>页面内容</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script setup lang="ts">
import useLayoutSetStore from '@/store/modules/setting'

const layoutSetStore = useLayoutSetStore()
const changeFold = () => {
  layoutSetStore.changeFold()
}
</script>
<script lang="ts">
export default {
  name: 'Breadcrumb',
}
</script>

<style lang="scss" scoped></style>
