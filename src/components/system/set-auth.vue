<template>
  <el-card class="set-auth" shadow="never">
    <template #header>
      <div class="card-header">
        <span>设置权限</span>
        <el-button :loading="btnLoading" :disabled="!props.role" size="mini" type="primary" @click="updatePermission">保存</el-button>
      </div>

    </template>
    <el-tree
      ref="treeRef"
      :data="menus"
      value-key="_id"
      node-key="_id"
      lazy
      :load="getChildren"
      show-checkbox
      check-strictly
      :default-checked-keys="selectedNode"
      :props="{label: 'menuName', isLeaf: 'isLeaf'}"
      @check="checkChange"
    />
  </el-card>
</template>

<script lang="ts" setup>
import { ref, onMounted, watch } from 'vue'
import service from '@/utils/request';
import type { ElTree } from 'element-plus'
import { ElMessage } from 'element-plus'
import { useStore } from 'vuex'

const store = useStore()

interface Role {
  roleName: string
  remark: string
  _id: string
  permissionList?: string[]
}

const props = defineProps<{
  role?: Role
}>()

const emit = defineEmits<{(e: 'update'): void }>()

const menus = ref<any[]>([])
const treeRef = ref<InstanceType<typeof ElTree>>()
const selectedNode = ref<string[]>([])
const btnLoading = ref(false)

function getRootMenus() {
  service.post<any, any[]>('/menu/default', {
    parentId: []
  })
    .then(data => {
      menus.value = data
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
      resolve(data)
    })
}

onMounted(() => {
  getRootMenus()
  if (props.role) {
    selectedNode.value = props.role.permissionList || []
    treeRef.value?.setCheckedKeys(selectedNode.value, false)
  }
})

function checkChange(val: any, keys: any) {
  const tem: any = new Set([...selectedNode.value, ...keys.checkedKeys])
  selectedNode.value = [...tem]
  service.get<any, string[]>('/menu/child/keys', {
    params: {
      id: val._id
    }
  })
    .then(data => {
      if (keys.checkedKeys.indexOf(val._id) >= 0) {
        selectedNode.value = [...selectedNode.value, ...data]
      } else {
        const copy = [...selectedNode.value]
        const idMap: any = {
          [val._id]: true
        }
        data.forEach(item => {
          idMap[item] = true
        })
        for (let i = 0; i < copy.length; i++) {
          if (idMap[copy[i]]) {
            copy.splice(i, 1)
            i--
          }
        }
        selectedNode.value = copy
        treeRef.value?.setCheckedKeys(selectedNode.value, false)
      }
    })
}

watch(props, () => {
  if (props.role) {
    selectedNode.value = props.role.permissionList || []
    treeRef.value?.setCheckedKeys(selectedNode.value, false)
  }
})

function updatePermission() {
  btnLoading.value = true
  service.post('/roles/permission', {
    action: 'edit',
    _id: props.role?._id,
    permissionList: selectedNode.value
  })
    .then(() => {
      ElMessage.success('权限设置成功')
      emit('update')
      btnLoading.value = false
      store.dispatch('getMenus')
    })
    .catch(() => {
      btnLoading.value = false
    })
}
</script>

<style scoped lang="stylus">
.set-auth
  margin 16px
  min-width 200px
  min-height 200px
  .card-header
    display flex
    align-items center
    justify-content space-between
</style>
