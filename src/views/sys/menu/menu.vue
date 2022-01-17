<template>
  <div class="menu">
    <div class="query-form">
      <el-form inline size="mini" :model="form" ref="formRef">
        <el-form-item label="菜单名称" prop="menuName">
          <el-input v-model="form.menuName" />
        </el-form-item>
        <el-form-item label="菜单状态" prop="menuState">
          <el-select v-model="form.menuState">
            <el-option
              label="启用"
              :value="1"
            />
            <el-option
              label="禁用"
              :value="2"
            />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="filterTable">查询</el-button>
          <el-button @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="base-table">
      <div class="action">
        <el-button v-permission="['menu:add']" type="primary" size="mini" @click="toggleDialog(true)">新增</el-button>
      </div>
      <el-table
        ref="tableRef"
        v-loading="tableLoading"
        :data="tableData"
        row-key="_id"
        border
        lazy
        :load="load"
        :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
      >
        <el-table-column prop="menuName" label="菜单名称" width="200" />
        <el-table-column prop="icon" label="图标">
          <template #default="scope">
            <i :class="scope.row.icon" v-if="scope.row.icon" />
          </template>
        </el-table-column>
        <el-table-column prop="menuType" label="菜单类型">
          <template #default="scope">
            {{ scope.row.menuType === 1 ? '菜单' : '按钮' }}
          </template>
        </el-table-column>
        <el-table-column prop="path" label="路由地址" />
        <el-table-column prop="menuState" label="菜单状态">
          <template #default="scope">
            {{ scope.row.menuState === 1 ? '启用' : '禁用' }}
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="name" label="操作" width="150">
          <template #default="scope">
            <el-button v-permission="['menu:edit']" type="primary" size="mini" @click="toggleDialog(true, scope.row)">编辑</el-button>
            <el-button v-permission="['menu:delete']" type="danger" size="mini" @click="deleteRows(scope.row._id, '_id', false)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <add-menu
      :dialog-visible="dialogVisible"
      v-if="dialogVisible"
      :default-val="editRow"
      @close="toggleDialog(false)"
      @update="getList"
    />
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import AddMenu from '@/components/system/add-menu.vue';
import useQueryTable from '@/hooks/query-table';
import service from '@/utils/request';

const tableRef = ref()

const form = reactive({
  menuState: '',
  menuName: ''
})

const formRef = ref()

function load(row: any, treeNode: any, resolve: Function) {
  service.post('/menu/children', {
    parentId: [...row.parentId, row._id]
  })
    .then(data => {
      resolve(data)
    })
}

const {
  tableLoading,
  filterTable,
  resetForm,
  tableData,
  getList,
  deleteRows,
  editRow,
  dialogVisible,
  toggleDialog
} = useQueryTable({
  form,
  formRef,
  url: '/menu/list',
  deleteUrl: '/menu/operate',
  tableRef
})
</script>

<style scoped lang="stylus">

</style>
