<template>
  <el-dialog
    :title="!defaultVal ? '新增用户' : '编辑用户'"
    :model-value="dialogVisible"
    width="700px"
    :close-on-click-modal="false"
    @close="closeDia"
    @opened="openDia"
  >
    <el-form label-width="100px" :model="form" :rules="rules" ref="formRef">
      <el-form-item label="用户名" prop="userName">
        <el-input v-model="form.userName" placeholder="请输入用户名" />
      </el-form-item>
      <el-form-item label="邮箱" prop="userEmail">
        <el-input v-model="form.userEmail" placeholder="请输入邮箱" />
      </el-form-item>
      <el-form-item label="手机号" prop="mobile">
        <el-input v-model="form.mobile" placeholder="请输入手机号" />
      </el-form-item>
      <el-form-item label="岗位" prop="job">
        <el-input v-model="form.job" placeholder="请输入岗位" />
      </el-form-item>
      <el-form-item label="状态" prop="state">
        <el-select v-model="form.state">
          <el-option label="在职" :value="1" />
          <el-option label="离职" :value="2" />
          <el-option label="试用期" :value="3" />
        </el-select>
      </el-form-item>
      <el-form-item label="系统角色" prop="roleList">
        <el-select style="width: 100%;" multiple v-model="form.roleList">
          <el-option
            v-for="item in roles.originVal"
            :key="item._id"
            :value="item._id"
            :label="item.roleName"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="所属部门" prop="deptId">
        <el-cascader
          v-model="form.deptId"
          :options="depts"
          :show-all-levels="false"
          :props="{ checkStrictly: true, value: '_id', label: 'deptName' }"
          clearable
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="closeDia">取消</el-button>
      <el-button type="primary" @click="submit" :loading="btnLoading">确认</el-button>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { reactive, onMounted, ref, computed } from 'vue';
import service from '@/utils/request';
import { ElMessage } from 'element-plus';
import { useStore } from 'vuex'

const store = useStore()

interface FormVal {
  userName: string
  userEmail: string
  mobile: string
  job: string[]
  state: number
  roleList: string[]
  deptId: string[]
  userId?: number
}

const props = defineProps<{
  dialogVisible: boolean
  defaultVal?: FormVal
}>()

const emit = defineEmits<{(e: 'close'): void; (e: 'update'): void }>();

const form = reactive<FormVal>({
  userName: '',
  userEmail: '',
  mobile: '',
  job: [],
  state: 1,
  roleList: [],
  deptId: []
})

const formRef = ref()
const depts = ref<any[]>([])
const roles = computed(() => store.state.roles)
const btnLoading = ref(false)

const rules = reactive({
  userName: [
    { required: true, message: '请输入用户名', trigger: 'blur' }
  ],
  userEmail: [
    { type: 'email', required: true, message: '请输入正确的邮箱', trigger: 'blur' }
  ],
  mobile: [
    { required: true, message: '请输入手机号', trigger: 'blur' },
    { pattern: /^1\d{10}$/, message: '请输入正确的手机号' }
  ],
  roleList: [
    { required: true, message: '请选择角色', trigger: 'change' }
  ]
  // deptId: [
  //   { required: true, message: '请选择部门', trigger: 'change' }
  // ]
})

const closeDia = () => {
  formRef.value.resetFields()
  emit('close')
}

const submit = () => {
  formRef.value.validate((valid: boolean) => {
    if (valid) {
      btnLoading.value = true
      const data = {
        ...form
      }
      if (props.defaultVal) {
        data.userId = props.defaultVal.userId
      }
      service.post('/users/operate', {
        ...form
      })
        .then(() => {
          btnLoading.value = false
          closeDia()
          emit('update')
          ElMessage.success(`${props.defaultVal ? '更新' : '新增'}成功`)
        })
        .catch(() => {
          btnLoading.value = false
        })
    }
  })
}

const openDia = () => {
  const { defaultVal } = props
  if (defaultVal) {
    form.userId = defaultVal.userId
    form.userName = defaultVal.userName
    form.userEmail = defaultVal.userEmail
    form.mobile = defaultVal.mobile
    form.job = defaultVal.job
    form.state = defaultVal.state
    form.roleList = defaultVal.roleList
    form.deptId = defaultVal.deptId
  }
}

onMounted(() => {
  service.get<any, any[]>('/dept/all')
    .then(data => {
      depts.value = data
    })
})
</script>

<style scoped>

</style>
