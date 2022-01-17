<template>
  <el-dialog
    :title="!defaultVal ? '新增菜单' : '编辑菜单'"
    :model-value="dialogVisible"
    width="700px"
    :close-on-click-modal="false"
    @close="closeDia"
  >
    <el-form label-width="100px" :model="form" :rules="rules" ref="formRef">
      <el-form-item label="父级菜单" prop="parentId">
        <tree-select
          :disabled="!!props.defaultVal"
          v-model="form.parentId"
          value-key="_id"
          node-key="_id"
          lazy
          :options="menus"
          parent-key="parentId"
          :load="getChildren"
          :default-expanded-keys="form.parentId"
          :tree-props="{ label: 'menuName', isLeaf: 'isLeaf' }"
        />
        <span class="form-tips">不选，则直接创建一级菜单</span>
      </el-form-item>
      <el-form-item label="菜单类型" prop="menuType">
        <el-radio-group v-model="form.menuType" @change="changeType" :disabled="!!defaultVal">
          <el-radio :label="1">菜单</el-radio>
          <el-radio :label="2">按钮</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="图标" v-if="form.menuType===1" style="position:relative;">
        <el-select-v2 v-model="form.icon" :options="iconVirtualizeds" style="width: 250px" filterable>
          <template #default="{ item }">
            <div class="icon"><span>{{ item.label }}</span><i :class="item.value" /></div>
          </template>
        </el-select-v2>
        <i :class="form.icon" v-if="form.icon" class="select-menu-icon" />
      </el-form-item>
      <el-form-item :label="`${form.menuType === 1 ? '菜单' : '按钮'}名称`" prop="menuName">
        <el-input v-model="form.menuName" :placeholder="`请输入${form.menuType === '1' ? '菜单' : '按钮'}名称`" />
      </el-form-item>
      <el-form-item label="路由地址" prop="path" v-if="form.menuType===1">
        <el-input v-model="form.path" placeholder="请输入路由地址" />
      </el-form-item>
      <el-form-item label="权限标识" prop="menuCode">
        <el-input v-model="form.menuCode" placeholder="请输入权限标识" />
      </el-form-item>
      <el-form-item label="排序" prop="sortLevel">
        <el-input v-model.number="form.sortLevel" type="number" />
      </el-form-item>
      <el-form-item label="菜单状态">
        <el-radio-group v-model="form.menuState">
          <el-radio :label="1">启用</el-radio>
          <el-radio :label="2">禁用</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="closeDia">取消</el-button>
      <el-button type="primary" @click="submit" :loading="btnLoading">确认</el-button>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { reactive, ref, computed, onMounted } from 'vue';
import service from '@/utils/request';
import { ElMessage } from 'element-plus';
import iconKeys from '@/config/iconKeys';
import { deleteBtnMenu } from '@/utils/menusHelper';
import TreeSelect from '@/components/tree-select/tree-select.vue'
import { useStore } from 'vuex'

const store = useStore()

const iconVirtualizeds = iconKeys.map(item => {
  return {
    value: item,
    label: item
  }
})

interface FormVal {
  parentId: string[]
  menuType: number
  menuName: string
  icon: string
  path: string
  menuCode: string
  menuState: number
  _id?: string
  sortLevel: number
}

const props = defineProps<{
  dialogVisible: boolean
  defaultVal?: FormVal
}>()

const emit = defineEmits<{(e: 'close'): void; (e: 'update'): void }>();

const form = reactive<FormVal>({
  parentId: [],
  menuType: 1,
  menuName: '',
  icon: '',
  path: '',
  menuCode: '',
  menuState: 1,
  sortLevel: 1
})

const formRef = ref()
const btnLoading = ref(false)
const defaultMenus = ref<any[]>([])

const rules = reactive({
  menuName: [
    { required: true, message: '请输入名称', trigger: 'blur' }
  ],
  path: [
    { required: true, message: '请输入路由地址', trigger: 'blur' }
  ],
  menuCode: [
    {}
  ]
})

function changeType(val: number) {
  rules.menuCode = [
    { required: val === 2, message: '请输入权限标识', trigger: ['change', 'blur'] }
  ]
}

const closeDia = () => {
  formRef.value.resetFields()
  emit('close')
}

const submit = () => {
  formRef.value.validate((valid: boolean) => {
    if (valid) {
      btnLoading.value = true
      service.post('/menu/operate', {
        action: props.defaultVal ? 'edit' : 'add',
        _id: props.defaultVal?._id,
        params: {
          ...form
        }
      })
        .then(() => {
          btnLoading.value = false
          closeDia()
          emit('update')
          ElMessage.success(`${props.defaultVal ? '更新' : '新增'}成功`)
          store.dispatch('getMenus')
        })
        .catch(() => {
          btnLoading.value = false
        })
    }
  })
}

function getChildren(node: any, resolve: Function) {
  if (!node.data._id) return
  if (node.data.children && node.data.children.length) {
    resolve(node.data.children)
    return;
  }
  service.post<any, any[]>('/menu/children', {
    parentId: [...node.data.parentId, node.data._id]
  })
    .then(data => {
      resolve(data.filter((item: any) => item.menuType === 1))
    })
}

function getDefaultMenus() {
  service.post<any, any[]>('/menu/default', {
    parentId: props.defaultVal?.parentId || []
  })
    .then(data => {
      defaultMenus.value = data
    })
}

const menus = computed(() => {
  return deleteBtnMenu(defaultMenus.value)
})

onMounted(() => {
  getDefaultMenus()
  if (props.defaultVal) {
    form.icon = props.defaultVal.icon
    form.parentId = props.defaultVal.parentId
    form.menuType = props.defaultVal.menuType
    form.menuName = props.defaultVal.menuName
    form.path = props.defaultVal.path
    form.menuCode = props.defaultVal.menuCode
    form.menuState = props.defaultVal.menuState
    form.sortLevel = props.defaultVal.sortLevel
  }
})
</script>

<style scoped lang="stylus">
.icon
  display flex
  justify-content space-between
  align-items center
.select-menu-icon
  position absolute
  left 200px
  top 10px
  font-size 14px
.form-tips
  margin-left 10px
  font-size 12px
  color red
</style>
