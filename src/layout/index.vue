<template>
  <div class="layout_container">
    <div class="layout_slider">
      <LogoComp></LogoComp>
      <el-scrollbar class="scrollbar">
        <!-- default-active的作用是菜单中某一项处于选中状态，页面刷新后，那一项会依旧被选中，而且展开，不会被重置 -->
        <el-menu
          background-color="#525354"
          text-color="white"
          active-text-color="yellowgreen"
          unique-opened
          :default-active="$route.path"
          :collapse="layoutSetStore.isFold ? false : true"
        >
          <!--根据路由动态生成菜单-->
          <MenuComp :menuList="userStore.menuRoutes"></MenuComp>
        </el-menu>
      </el-scrollbar>
    </div>
    <div
      class="layout_tabbar"
      :class="{ fold: layoutSetStore.isFold ? false : true }"
    >
      <Tabbar></Tabbar>
    </div>
    <div
      class="layout_main"
      :class="{ fold: layoutSetStore.isFold ? false : true }"
    >
      <MainComp></MainComp>
    </div>
  </div>
</template>

<script setup lang="ts">
//获取路由对象
import { useRoute } from 'vue-router'
import LogoComp from './LogoComp/index.vue'
import MenuComp from './MenuComp/index.vue'
import Tabbar from './TabbarComp/index.vue'
import MainComp from './MainComp/index.vue'
import useUserStore from '@/store/modules/user'
import useLayoutSetStore from '@/store/modules/setting'

const layoutSetStore = useLayoutSetStore()
let userStore = useUserStore()
//获取路由对象
let $route = useRoute()
</script>
<script lang="ts">
export default {
  name: 'Layout',
}
</script>

<style scoped lang="scss">
.layout_container {
  width: 100%;
  height: 100vh;

  .layout_slider {
    color: white;
    width: $base_menu_width;
    height: 100vh;
    background: $base_menu_background;
    transition: all 0.3s;

    .scrollbar {
      width: 100%;
      height: calc(100vh - $base_menu_logo_height);

      .el-menu {
        border-right: none;
      }
    }
  }

  .layout_tabbar {
    position: fixed;
    width: calc(100% - $base_menu_width);
    height: $base_tabbar_height;
    top: 0px;
    left: $base_menu_width;
    transition: all 0.3s;
    background: #fff;
    &.fold {
      width: calc(100vw - $base_menu_min_width);
      left: $base_menu_min_width;
    }
  }

  .layout_main {
    position: absolute;
    width: calc(100% - $base_menu_width);
    height: calc(100vh - $base_tabbar_height);
    left: $base_menu_width;
    top: $base_tabbar_height;
    padding: 20px;
    overflow: auto;
    transition: all 0.3s;
    background: #f1f1f1;
    &.fold {
      width: calc(100vw - $base_menu_min_width);
      left: $base_menu_min_width;
    }
  }
}
</style>
