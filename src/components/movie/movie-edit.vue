<template>
  <el-dialog
    :model-value="dialogVisible"
    :title="defaultVal?.title"
		@close="emit('close')"
		width="500px"
  >
    <el-form :model="form" ref="formRef">
      <el-form-item label="点击量" prop="clicks" required>
        <el-input type="number" v-model="form.clicks" />
      </el-form-item>
		</el-form>
		<template #footer>
			<el-button type="primary" @click="submit" :loading="btnLoading">确认</el-button>
		</template>
  </el-dialog>
</template>

<script lang="ts" setup>
import service from '@/utils/request';
import { reactive, ref } from 'vue';

const props = defineProps<{
  dialogVisible: boolean
  defaultVal?: any
}>()

const emit = defineEmits<{(e: 'close'): void; (e: 'update'): void }>();

const form = reactive({
  clicks: props.defaultVal?.clicks || 0
})

const formRef = ref()
const btnLoading = ref(false)

function submit() {
  formRef.value.validate((valid: boolean) => {
    if (valid) {
      btnLoading.value = true
		  service.post('/movie/edit', {
			  id: props.defaultVal.id,
			  ...form
		  })
        .then(() => {
          btnLoading.value = false
          emit('close')
          emit('update')
        })
        .catch(() => {
          btnLoading.value = false
        })
	  }
	})
}
</script>

<style>

</style>