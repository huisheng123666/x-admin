<template>
  <div class="error-page">
    <el-result
      icon="error"
      :title="query.title"
      :sub-title="query.subTitle"
    >
      <template #extra>
        <a href="/">
          <el-button type="primary">回到首页</el-button>
        </a>
      </template>
    </el-result>
  </div>
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router'
import { computed } from 'vue';

const route = useRoute()

const query = computed(() => {
  const status = route.query.status
  return {
    title: status,
    subTitle: status === '500' ? '服务错误' : status === '401' ? '您没有权限访问' : '页面未找到'
  }
})
</script>
