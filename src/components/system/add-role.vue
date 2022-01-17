<template>
  <el-dialog
    :model-value="props.dialogVisible"
    :title="props.defaultVal ? '编辑角色' : '新增角色'"
    width="500px"
    :close-on-click-modal="false"
    @close="closeDia"
  >
    <el-form
      label-width="100px"
      :model="form"
      size="small"
      ref="formRef"
      :rules="rules"
    >
      <el-form-item label="角色名称：" prop="roleName">
        <el-input v-model="form.roleName" placeholder="请输入角色名称" />
      </el-form-item>
      <el-form-item label="备注：" prop="remark">
        <el-input v-model="form.remark" type="textarea" :rows="5" />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="closeDia">取消</el-button>
      <el-button type="primary" @click="submit">确定</el-button>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { reactive, ref, onMounted } from 'vue';
import service from '@/utils/request';
import { useStore } from 'vuex'

const store = useStore()

interface Role {
  roleName: string
  remark: string
  _id?: string
}

const props = defineProps<{
  dialogVisible: boolean
  defaultVal?: Role
}>()

const emit = defineEmits<{(e: 'close'): void, (e: 'update'): void }>()

const formRef = ref()

function closeDia() {
  emit('close')
  formRef.value.resetFields()
}

const form = reactive<Role>({
  roleName: '',
  remark: ''
})

const rules = reactive({
  roleName: [
    { required: true, message: '请输入角色名称' }
  ]
})

onMounted(() => {
  if (props.defaultVal) {
    form.roleName = props.defaultVal.roleName
    form.remark = props.defaultVal.remark
  }
})

function submit() {
  formRef.value.validate((valid: boolean) => {
    if (valid) {
      service.post('/roles/operate', {
        ...form,
        action: props.defaultVal ? 'edit' : 'add',
        _id: props.defaultVal ? props.defaultVal._id : null
      })
        .then((data) => {
          closeDia()
          emit('update')
          store.dispatch('getRoles')
        })
    }
  })
}
</script>

<style scoped lang="stylus">

</style>
