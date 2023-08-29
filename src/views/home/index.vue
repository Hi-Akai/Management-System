<template>
  <div>主页</div>
</template>

<script setup lang="ts">
import useUserStore from '@/store/modules/user'
import { onMounted } from 'vue'
const userStore = useUserStore()
onMounted(() => {
  userStore.getUserInfo()
})
</script>
<style scoped></style>
