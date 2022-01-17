<template>
  <el-breadcrumb separator="/">
    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item v-for="item in list" :key="item.name">{{ item.name }}</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script lang="ts" setup>
import { BreadCrumbItem } from '@/utils/genBreadList';

defineProps<{
  list: BreadCrumbItem[]
}>()
</script>

<style scoped lang="stylus">

</style>
