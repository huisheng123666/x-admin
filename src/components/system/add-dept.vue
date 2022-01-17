<template>
  <el-dialog
    width="40%"
    :model-value="props.dialogVisible"
    :title="props.defaultVal ? '部门编辑' : '部门新增'"
    :close-on-click-modal="false"
    @close="closeDia"
  >
    <el-form :model="form" ref="formRef" label-width="100px" :rules="rules">
      <el-form-item label="上级部门：">
        <tree-select
          :disabled="!!props.defaultVal"
          v-model="form.parentId"
          value-key="_id"
          node-key="_id"
          lazy
          :options="defaultDepts"
          parent-key="parentId"
          :load="getChildren"
          :default-expanded-keys="form.parentId"
          :tree-props="{ label: 'deptName', isLeaf: 'isLeaf' }"
        />
      </el-form-item>
      <el-form-item label="部门名称" prop="deptName">
        <el-input v-model="form.deptName" placeholder="请输入部门名称" />
      </el-form-item>
      <el-form-item label="负责人" prop="user">
        <el-select v-model="form.user" placeholder="请选择负责人">
          <el-option
            v-for="item in users"
            :key="item.userId"
            :label="item.userName"
            :value="item._id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="排序" prop="sortLevel">
        <el-input-number v-model="form.sortLevel" />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button type="primary" @click="submit" :loading="btnLoading">提交</el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted } from 'vue'
import { User } from '@/types';
import service from '@/utils/request';
import TreeSelect from '@/components/tree-select/tree-select.vue'

interface Dept {
  deptName: string
  _id?: string
  user: string | {
    _id: string
  }
  parentId: string[]
  sortLevel: number
}

const props = defineProps<{
  dialogVisible: boolean
  defaultVal?: Dept
}>()

const emit = defineEmits<{(e: 'close'): void, (e: 'update'): void }>()

const formRef = ref()
const users = ref<User[]>([])
const btnLoading = ref(false)

const defaultDepts = ref<any[]>([])

function closeDia() {
  emit('close')
  formRef.value.resetFields()
}

const form = reactive<Dept>({
  deptName: '',
  parentId: [],
  user: '',
  sortLevel: 1
})

const rules = reactive({
  deptName: [
    { required: true, message: '请输入部门名称' }
  ],
  user: [
    { required: true, message: '请选择负责人' }
  ]
})

function getUsers() {
  service.get<any, User[]>('/users/all')
    .then(data => {
      users.value = data
    })
}

function getDefaultDepts() {
  service.post<any, any[]>('/dept/default', {
    parentId: props.defaultVal?.parentId || []
  })
    .then(data => {
      defaultDepts.value = data
    })
}

function getChildren(node: any, resolve: Function) {
  if (!node.data._id) return
  if (node.data.children && node.data.children.length) {
    resolve(node.data.children)
    return;
  }
  service.post<any, any[]>('/dept/children', {
    parentId: [...node.data.parentId, node.data._id]
  })
    .then(data => {
      resolve(data)
    })
}

onMounted(() => {
  getUsers()
  getDefaultDepts()
  if (props.defaultVal) {
    form.parentId = props.defaultVal.parentId
    form.deptName = props.defaultVal.deptName
    form.user = typeof props.defaultVal.user === 'string' ? '' : props.defaultVal.user._id
    form.sortLevel = props.defaultVal.sortLevel
  }
})

function submit() {
  formRef.value.validate((valid: boolean) => {
    if (valid) {
      btnLoading.value = true
      service.post('/dept/operate', {
        action: props.defaultVal ? 'edit' : 'add',
        params: {
          ...form
        },
        _id: props.defaultVal?._id
      })
        .then(() => {
          emit('update')
          closeDia()
          btnLoading.value = false
        })
        .catch(() => {
          btnLoading.value = false
        })
    }
  })
}
</script>

<style scoped lang="stylus">

</style>
