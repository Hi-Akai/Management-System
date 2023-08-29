<template>
  <!-- 菜单栏展开按键 -->
  <el-icon style="margin-right: 10px" size="20" color="red">
    <component
      :is="layoutSetStore.isFold ? 'Fold' : 'Expand'"
      @click="changeFold"
    ></component>
  </el-icon>
  <!-- 面包屑 -->
  <el-breadcrumb :separator-icon="'ArrowRight'">
    <el-breadcrumb-item
      v-for="(item, index) in $route.matched"
      :key="index"
      v-show="item.meta.title"
      :to="item.path"
    >
      <el-icon>
        <component :is="item.meta.icon"></component>
      </el-icon>
      <span>{{ item.meta.title }}</span>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script setup lang="ts">
import useLayoutSetStore from '@/store/modules/setting'
import { useRoute } from 'vue-router'

const layoutSetStore = useLayoutSetStore()
const $route = useRoute()
const changeFold = () => {
  layoutSetStore.changeFold()
}
</script>
<script lang="ts">
export default {
  name: 'Breadcrumb',
}
</script>

<style lang="scss" scoped>
:deep(.el-breadcrumb__inner) {
  display: flex;
  align-items: center;
}
</style>
