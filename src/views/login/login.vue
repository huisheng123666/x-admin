<template>
  <div class="login-wrapper">
    <div class="model">
      <el-form :model="user" :rules="rules" ref="loginForm" @submit.prevent="submit">
        <h4 class="title">x-admin</h4>
        <el-form-item prop="userName">
          <el-input :prefix-icon="Avatar" v-model="user.userName" />
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" :prefix-icon="Lock" v-model="user.userPwd" />
        </el-form-item>
        <el-form-item>
          <el-button native-type="submit" class="btn" type="primary">登陆</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div id="login_bg"></div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted } from 'vue'
import { Avatar, Lock } from '@element-plus/icons'
import service from '@/utils/request';
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { setItem } from '@/utils/storage'
import { User } from '@/types';

const router = useRouter()
const store = useStore()

const user = reactive<{
  userName: string
  userPwd: string
}>({
  userName: 'admin',
  userPwd: '123456'
})

const rules = reactive({
  userName: [
    { required: true, message: '请输入用户名', trigger: 'blur' }
  ],
  userPwd: [
    { required: true, message: '请输入密码', trigger: 'blur' }
  ]
})

const loginForm = ref()

const submit = () => {
  loginForm.value.validate((valid: boolean) => {
    if (valid) {
      service.post<any, User>('/users/login', {
        ...user
      })
        .then(data => {
          store.commit('saveUserinfo', data)
          setItem('x_token', data.token)
          router.replace('/')
        })
    }
  })
}

onMounted(() => {
  window.particlesJS.load('login_bg', '/x/particles.json', () => {})
})
</script>

<style scoped lang="stylus">
.login-wrapper
  display flex
  width 100vw
  height 100vh
  justify-content center
  align-items center
  background #000
  position relative
  .model
    width 500px
    padding 50px
    background #000
    border-radius 4px
    box-shadow 0 0 10px 3px #c7c9cb4c
    position relative
    z-index 2
    opacity 0.8
    .title
      margin-bottom 20px
      text-align center
      color #fff
      font-size 20px
      font-weight bold
    .btn
      width 100%
  #login_bg
    position absolute
    left 0
    top 0
    width 100%
    height 100%
    z-index 1
</style>
