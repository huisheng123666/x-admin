<template>
  <el-sub-menu :index="menu.path" v-if="children.length && menu.menuState === 1" :key="menu.path">
    <template #title>
      <i :class="[menu.icon, 'menu-icon']" />&nbsp;
      <span>{{ menu.menuName }}</span>
    </template>
    <menu-item v-for="item in menu.children" :key="item.path" :menu="item" />
  </el-sub-menu>
  <el-menu-item v-else-if="menu.menuType===1 && menu.menuState === 1" :index="menu.path" :key="menu.path">
    <i :class="[menu.icon, 'menu-icon']" v-if="menu.icon" />&nbsp;
    <template #title>
      <span>{{ menu.menuName }}</span>
    </template>
  </el-menu-item>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Menu } from '@/types';

const props = defineProps<{
  menu: Menu
}>()

const children = computed(() => {
  if (!props.menu.children) return []
  return props.menu.children.filter((item: any) => {
    return item.menuType === 1
  })
})
</script>

<style scoped lang="stylus">
::v-deep(.el-menu)
  background-color rgb(0, 21, 41)
.menu-icon
  font-size 14px
</style>
