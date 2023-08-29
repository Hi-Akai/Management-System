<template>
  <div class="logo">
    <img src="@/assets/logo/OneMore1.png" alt="logo" />
    <p>MORE.</p>
  </div>
</template>

<script setup lang="ts"></script>
<script lang="ts">
export default {
  name: 'LogoComp',
}
</script>

<style scoped lang="scss">
.logo {
  width: 100%;
  height: $base-menu-logo-height;
  color: white;
  display: flex;
  align-items: center;
  padding: 10px;

  img {
    width: 30px;
    height: 30px;
  }

  p {
    font-size: $base-logo-title-fontSize;
    margin-left: 10px;
  }
}
</style>
