<template>
  <div class="user-manage">
    <div class="query-form">
      <el-form inline size="mini" ref="formRef" :model="form">
        <el-form-item label="用户ID：" prop="userId">
          <el-input type="number" v-model.number="form.userId" />
        </el-form-item>
        <el-form-item label="用户名：" prop="userName">
          <el-input v-model="form.userName" />
        </el-form-item>
        <el-form-item label="状态" prop="state">
          <el-select v-model="form.state">
            <el-option label="所有" :value="0" />
            <el-option label="在职" :value="1" />
            <el-option label="离职" :value="2" />
            <el-option label="试用期" :value="3" />
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
        <el-button v-permission="['user:add']" type="primary" size="mini" @click="toggleDialog(true)">新增</el-button>
        <el-button
          v-permission="['user:delete']"
          @click="deleteRows(null, 'userIds')"
          type="danger"
          size="mini"
          :disabled="!selectedList.length"
        >批量删除</el-button>
      </div>
      <el-table :data="tableData" v-loading="tableLoading" @selection-change="selectionChange">
        <el-table-column type="selection"/>
        <el-table-column label="用户ID" prop="userId" />
        <el-table-column label="用户名" prop="userName" />
        <el-table-column label="用户邮箱" prop="userEmail" show-overflow-tooltip />
        <el-table-column label="角色" prop="roleList" :formatter="splicing" show-overflow-tooltip />
        <el-table-column label="用户状态" width="100">
          <template #default="scope">{{ stateTextMap[scope.row.state] }}</template>
        </el-table-column>
        <el-table-column label="注册时间" prop="createTime" show-overflow-tooltip />
        <el-table-column label="最后登陆时间" prop="lastLoginTime" show-overflow-tooltip />
        <el-table-column width="150" label="操作">
          <template #default="scope">
            <el-button v-permission="['user:edit']" size="mini" type="primary" @click="toggleDialog(true, scope.row)">编辑</el-button>
            <el-button v-permission="['user:delete']" size="mini" type="danger" @click="deleteRows(scope.row.userId, 'userIds')">删除</el-button>
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

    <add-user
      :dialog-visible="dialogVisible"
      @close="toggleDialog(false)"
      @update="updateList"
      :default-val="editRow"
    />

  </div>
</template>

<script lang="ts" setup>
import { computed, reactive, ref } from 'vue';
import useQueryTable from '@/hooks/query-table'
import AddUser from '@/components/system/add-user.vue'
import { useStore } from 'vuex'

const store = useStore()

interface QueryForm {
  userId: number | string
  userName: string
  state: number
}

const formRef = ref()

const stateTextMap = {
  0: '所有',
  1: '在职',
  2: '离职',
  3: '试用期'
}

const roles = computed(() => store.state.roles)

const form = reactive<QueryForm>({
  userId: '',
  userName: '',
  state: 0
})

function splicing(val: any) {
  if (roles.value) {
    const res = val.roleList.map((item: string) => {
      return roles.value.mapVal[item]?.roleName
    })
    return res.filter((item: string) => item).join(',')
  }
}

const {
  resetForm,
  tableData,
  tableLoading,
  page,
  changePage,
  filterTable,
  selectedList,
  selectionChange,
  deleteRows,
  updateList,
  editRow,
  dialogVisible,
  toggleDialog
} = useQueryTable<QueryForm>({
  form,
  formRef,
  url: '/users/list',
  deleteUrl: '/users/delete'
})
</script>

<style scoped lang="stylus">

</style>
