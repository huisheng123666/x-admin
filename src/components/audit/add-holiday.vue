<template>
  <el-dialog
    title="申请休假"
    :model-value="props.visible"
    :close-on-click-modal="false"
    @close="closeDia"
    width="700px"
  >
    <el-form ref="formRef" :model="form" :rules="rules" label-width="100px">
      <el-form-item label="休假类型：" prop="applyType">
        <el-select v-model="form.applyType">
          <el-option label="事假" :value="1"  />
          <el-option label="调休" :value="2"  />
          <el-option label="年假" :value="3"  />
        </el-select>
      </el-form-item>
      <el-form-item label="开始时间：" prop="startTime">
        <el-date-picker value-format="YYYY-MM-DD" v-model="form.startTime" />
      </el-form-item>
      <el-form-item label="结束时间：" prop="endTime">
        <el-date-picker value-format="YYYY-MM-DD" v-model="form.endTime" />
      </el-form-item>
      <el-form-item label="休假时长：">
        {{ totalDay }}
      </el-form-item>
      <el-form-item label="休假原因：" prop="reasons">
        <el-input type="textarea" v-model="form.reasons" placeholder="请输入休假原因" />
      </el-form-item>
    </el-form>

    <template #footer>
      <el-button type="primary" @click="submit">提交</el-button>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { reactive, ref, computed } from 'vue';
import service from '@/utils/request';

const emit = defineEmits<{(e: 'close'): void; (e: 'update'): void }>();

const props = defineProps<{
  visible: boolean
}>()

const formRef = ref()
const btnLoading = ref(false)

const form = reactive({
  applyType: 1,
  startTime: '',
  endTime: '',
  leaveTime: '0天',
  reasons: ''
})

function validateEndTime(rule: any, val: string, callback: (err?: Error) => void) {
  if (!val) {
    callback(new Error('请输入休假原因'))
    return
  }
  if (!form.startTime) {
    callback()
    return;
  }
  const start = new Date(form.startTime).getTime()
  const end = new Date(val).getTime()
  if (end < start) {
    callback(new Error('结束时间必须大于等于开始时间'))
    return;
  }
  callback()
}

const rules = reactive({
  startTime: [
    { required: true, message: '请选择开始时间' }
  ],
  endTime: [
    { required: true, validator: validateEndTime }
  ],
  reasons: [
    { required: true, message: '请输入休假原因' }
  ]
})

const totalDay = computed(() => {
  if (!form.startTime || !form.endTime) {
    return '0天'
  }
  const distance = (new Date(form.endTime)).getTime() - (new Date(form.startTime)).getTime()
  return Math.ceil(distance / (24 * 60 * 60 * 1000)) + 1 + '天'
})

const closeDia = () => {
  formRef.value.resetFields()
  emit('close')
}

function submit() {
  formRef.value.validate((valid: boolean) => {
    if (valid) {
      btnLoading.value = true
      service.post('/leave/operate', {
        action: 'add',
        params: {
          ...form,
          leaveTime: totalDay.value
        }
      })
        .then(() => {
          btnLoading.value = false
          closeDia()
          emit('update')
        })
        .catch(() => {
          btnLoading.value = false
        })
    }
  })
}
</script>

<style scoped>

</style>
