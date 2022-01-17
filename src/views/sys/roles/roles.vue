<template>
  <div class="roles">
    <div class="query-form">
      <el-form inline size="small" ref="formRef" :model="form">
        <el-form-item label="角色名称：" prop="roleName">
          <el-input placeholder="请输入角色名称" v-model="form.roleName" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="filterTable">查询</el-button>
          <el-button @click="resetForm">重置</el-button>
          <el-button v-permission="['role:add']" type="primary" @click="toggleDialog(true)">创建</el-button>
        </el-form-item>
      </el-form>
    </div>

    <el-row class="roles-wrapper">
      <el-col :span="18">
        <div class="base-table">
          <el-table :data="tableData" border v-loading="tableLoading" highlight-current-row @current-change="handleCurrentChange">
            <el-table-column label="角色名称" prop="roleName" />
            <el-table-column label="备注" prop="remark" />
<!--            <el-table-column label="权限列表" />-->
            <el-table-column label="创建时间" prop="createTime" show-overflow-tooltip />
            <el-table-column label="操作" width="150">
              <template #default="scope">
                <el-button size="mini" v-permission="['role:edit']" @click="toggleDialog(true, scope.row)">编辑</el-button>
<!--                <el-button size="mini" type="primary" @click="toggleAuth(true, scope.row)">设置权限</el-button>-->
                <el-button size="mini" v-permission="['role:delete']" type="danger" @click="deleteRole(scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>

          <div class="pagination">
            <el-pagination
              background
              layout="prev, pager, next"
              :total="page.total"
              :current-page="page.pageNum"
              :page-size="page.pageSize"
              @current-change="changePage"
            />
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <set-auth @update="getList" :role="authRow" />
      </el-col>
    </el-row>
    <add-role
      v-if="dialogVisible"
      :dialog-visible="dialogVisible"
      :default-val="editRow"
      @close="toggleDialog(false)"
      @update="updateList"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import useQueryTable from '@/hooks/query-table';
import AddRole from '@/components/system/add-role.vue';
import SetAuth from '@/components/system/set-auth.vue';
import { useStore } from 'vuex'

const formRef = ref()
const authRow = ref<any>(null)
const store = useStore()

const form = reactive({
  roleName: ''
})

const {
  tableData,
  page,
  tableLoading,
  editRow,
  updateList,
  changePage,
  filterTable,
  resetForm,
  getList,
  dialogVisible,
  toggleDialog,
  deleteRows
} = useQueryTable({
  url: '/roles/list',
  formRef,
  form,
  deleteUrl: '/roles/operate'
})

const handleCurrentChange = (val: any) => {
  authRow.value = val
}

function deleteRole(row: any) {
  deleteRows(row._id, '_id', false, () => {
    store.dispatch('getRoles')
  })
}
</script>

<style scoped lang="stylus">
.roles-wrapper
  width 100%
  overflow: hidden;
  border-top 10px solid #eef0f3
  .base-table
    padding-top 16px
    border-top 0
</style>
