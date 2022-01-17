<template>
  <div class="basic-layout">
    <div :class="['nav-slide', isCollapse ? 'collapse' : '']">
      <h1 @click="$router.push('/')" class="brand">x<template v-if="!isCollapse">-admin</template></h1>
      <el-menu
        class="nav-menu"
        router
        background-color="#001529"
        text-color="#fff"
        :collapse="isCollapse"
        unique-opened
        :collapse-transition="false"
        :default-active="defaultActive"
      >
        <menu-item v-for="item in menus" :menu="item" :key="item.path" />
      </el-menu>
    </div>
    <div :class="['content-right', isCollapse ? 'collapse' : '']">
      <div class="nav-top">
        <div class="bread">
          <el-icon @click="toggleMenu" class="menu-icon"><fold/></el-icon>
          <bread-crumb :list="breadList" />
        </div>
        <div class="user">
          <el-badge class="notice" :is-dot="!!noticeCount" @click="$router.push('/audit/waiting')">
            <el-icon><bell/></el-icon>
          </el-badge>
          <el-dropdown @command="dropDownCommend" trigger="click">
            <span>
              {{ userInfo.userName }}
              <el-icon class="el-icon--right">
                <arrow-down />
              </el-icon>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="email">邮箱：{{ userInfo.userEmail }}</el-dropdown-item>
                <el-dropdown-item command="logout">退出</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </div>
      <div class="wrapper">
        <router-view class="router-content" v-slot="{ Component }">
          <transition name="fade-transform" mode="out-in">
            <component v-if="authGetSuccess" :is="Component" />
          </transition>
        </router-view>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, watch } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { User } from '@/types'
import { clear } from '@/utils/storage'
import { Fold, Bell, ArrowDown } from '@element-plus/icons'
import service from '@/utils/request';
import MenuItem from '@/components/menu-item/menu-item.vue';
import BreadCrumb from '@/components/bread-crumb/bread-crumb.vue';
import genBreadList from '@/utils/genBreadList';

const store = useStore()
const authGetSuccess = ref(false)

store.dispatch('getMenus')
  .then(() => {
    authGetSuccess.value = true
  })
store.dispatch('getRoles')

const route = useRoute()

const userInfo = computed<User>(() => store.state.userinfo || {})

const isCollapse = ref(false)
const noticeCount = ref(0)
const defaultActive = ref(location.pathname)

const toggleMenu = () => {
  isCollapse.value = !isCollapse.value
}

const dropDownCommend = (eventKey: string) => {
  if (eventKey === 'logout') {
    clear()
    window.location.replace('/login')
  }
}

const getNotice = () => {
  service.get<any, number>('/leave/count')
    .then(data => {
      noticeCount.value = data
    })
}

const menus = computed(() => store.state.menus)

onMounted(() => {
  getNotice()
})

const breadList = computed(() => {
  if (!menus.value.length) return []
  return genBreadList(menus.value, route.path)
})

watch(route, () => {
  defaultActive.value = route.path
})
</script>

<style scoped lang="stylus">
.fade-transform-leave-active, .fade-transform-enter-active
  transition all 0.5s

.fade-transform-enter-from
  opacity 0
  transform translate3d(-30px, 0, 0)

.fade-transform-leave-to
  opacity 0
  transform translate3d(30px, 0, 0)

.basic-layout
  position relative
  .nav-slide
    position fixed
    width 200px
    height 100vh
    left 0
    top 0
    background #001529
    color #fff
    overflow-y auto
    transition width 0.4s ease
    &::-webkit-scrollbar
      display none
    &.collapse
      width 64px
    .brand
      padding-top 10px
      padding-bottom 20px
      padding-left 20px
      font-size 30px
      font-weight bold
      white-space nowrap
      cursor pointer
    .nav-menu
      border-color #001529
  .content-right
    margin-left 200px
    transition all 0.4s ease
    &.collapse
      margin-left 64px
    .nav-top
      box-sizing border-box
      height 50px
      line-height 50px
      display flex
      justify-content space-between
      border-bottom 1px solid #ddd
      padding 0 10px
      .bread
        display flex
        align-items center
        .menu-icon
          margin-right 10px
          cursor pointer
        &>span
          margin-left 10px
      .user
        display flex
        align-items center
        .notice
          margin-right 10px
          margin-top 5px
          cursor pointer
          line-height 30px
    .wrapper
      box-sizing border-box
      padding 10px
      height calc(100vh - 50px)
      overflow-y scroll
      overflow-x hidden
      background #eef0f3
      .router-content
        min-height 100%
        background #fff
        overflow hidden
</style>
