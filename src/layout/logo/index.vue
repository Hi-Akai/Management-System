<template>
  <div class="logo">
    <img src="@/assets/logo/OneMore1.png" alt="logo" />
    <p>MORE.</p>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.logo {
  width: 100%;
  height: $base-menu-logo-height;
  color: white;
  display: flex;
  align-items: center;
  padding: 10px;

  img {
    width: 40px;
    height: 40px;
  }

  p {
    font-size: $base-logo-title-fontSize;
    margin-left: 10px;
  }
}
</style>
