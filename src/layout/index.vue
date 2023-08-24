<template>
  <div class="layout_container">
    <div class="layout_slider">
      <Logo></Logo>
    </div>
    <div class="layout_tabbar">顶部菜单栏</div>
    <div class="layout_main">主要内容</div>
  </div>
</template>

<script setup lang="ts">
import Logo from './logo/index.vue'
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
