<template>
  <div class="dept">
    <div class="query-form">
      <el-form inline :model="form" ref="formRef">
        <el-form-item prop="deptName">
          <el-input v-model="form.deptName" placeholder="请输入部门名称" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="filterTable">查询</el-button>
          <el-button @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="base-table">
      <div class="action">
        <el-button v-permission="['role:add']" type="primary" @click="toggleDialog(true)">新增</el-button>
      </div>
      <el-table
        :data="tableData"
        row-key="_id"
        border
        lazy
        :load="load"
        ref="tableRef"
      >
        <el-table-column label="部门名称" prop="deptName" />
        <el-table-column label="负责人" prop="user.userName" />
        <el-table-column label="更新时间" prop="updateTime" />
        <el-table-column label="创建时间" prop="createTime" />
        <el-table-column label="操作" width="150">
          <template #default="scope">
            <el-button type="primary" v-permission="['role:edit']" size="mini" @click="toggleDialog(true, scope.row)">编辑</el-button>
            <el-button type="danger" v-permission="['role:delete']" size="mini" @click="deleteRows(scope.row._id, '_id', false)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <add-dept
      v-if="dialogVisible"
      :default-val="editRow"
      :dialog-visible="dialogVisible"
      @close="toggleDialog(false)"
      @update="updateList"
    />
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
import useQueryTable from '@/hooks/query-table';
import AddDept from '@/components/system/add-dept.vue';
import service from '@/utils/request';

const formRef = ref()
const tableRef = ref()

const form = reactive({
  deptName: ''
})

const {
  resetForm,
  filterTable,
  tableData,
  editRow,
  updateList,
  deleteRows,
  dialogVisible,
  toggleDialog
} = useQueryTable({
  url: '/dept/list',
  deleteUrl: '/dept/operate',
  form,
  formRef,
  tableRef
})

function load(row: any, treeNode: any, resolve: Function) {
  service.post('/dept/children', {
    parentId: [...row.parentId, row._id]
  })
    .then(data => {
      resolve(data)
    })
}
</script>

<style scoped lang="stylus">

</style>
