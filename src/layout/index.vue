<template>
  <div class="layout_container">
    <div class="layout_slider">
      <LogoComp></LogoComp>
      <el-scrollbar class="scrollbar">
        <el-menu
          background-color="#001529"
          text-color="white"
          active-text-color="yellowgreen"
        >
          <!--根据路由动态生成菜单-->
          <MenuComp :menuList="userStore.menuRoutes"></MenuComp>
        </el-menu>
      </el-scrollbar>
    </div>
    <div class="layout_tabbar">顶部菜单栏</div>
    <div class="layout_main">主要内容</div>
  </div>
</template>

<script setup lang="ts">
import LogoComp from './LogoComp/index.vue'
import MenuComp from './MenuComp/index.vue'
import useUserStore from '@/store/modules/user'
let userStore = useUserStore()
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
  }
}
</style>
