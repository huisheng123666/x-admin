<template>
  <div class="audit-waiting">
    <div class="query-form">
      <el-form inline ref="formRef" :model="form">
        <el-form-item label="审批状态" prop="applyState">
          <el-select v-model="form.applyState">
            <el-option label="待审批" :value="1" />
            <el-option label="审批中" :value="2" />
            <el-option label="审批拒绝" :value="3" />
            <el-option label="审批通过" :value="4" />
            <el-option label="作废" :value="5" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="filterTable">查询</el-button>
          <el-button @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="base-table">
      <el-table
        :data="tableData"
      >
        <el-table-column label="单号" prop="orderNo" />
        <el-table-column label="申请人" prop="applyUser.userName" />
        <el-table-column label="休假时间" prop="startTime" />
        <el-table-column label="休假时长" prop="leaveTime" />
        <el-table-column label="休假类型" prop="applyTypeLabel" />
        <el-table-column label="休假原因" prop="reasons" show-overflow-tooltip />
        <el-table-column label="申请时间" prop="createTime" show-overflow-tooltip />
        <el-table-column label="审批人" prop="auditFlowsNames" />
        <el-table-column label="当前审批人" prop="curAuditUser.userName" />
        <el-table-column label="审批状态" prop="applyStateLabel" />
        <el-table-column label="操作">
          <template #default="scope">
            <el-button
              v-if="scope.row.curAuditUser.userId === userInfo.userId && scope.row.applyState < 3"
              @click="toggleDialog(true, scope.row)"
            >审批</el-button>
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

    <el-dialog
      v-if="dialogVisible"
      title="休假详情"
      width="600px"
      v-model="dialogVisible"
      @close="toggleDialog(false)"
      :close-on-click-modal="false"
    >
      <el-steps :active="step.active" align-center>
        <el-step title="待审批"></el-step>
        <el-step title="审批中"></el-step>
        <el-step :title="step.lastText"></el-step>
      </el-steps>
      <el-descriptions :column="2" style="margin-top: 20px; padding: 0 65px">
        <el-descriptions-item label="休假类型">{{ editRow.applyTypeLabel }}</el-descriptions-item>
        <el-descriptions-item label="休假时间">{{ editRow.startTime }}</el-descriptions-item>
        <el-descriptions-item label="休假时长">{{ editRow.leaveTime }}</el-descriptions-item>
        <el-descriptions-item label="休假原因">{{ editRow.reasons }}</el-descriptions-item>
        <el-descriptions-item label="审批状态">{{ editRow.applyStateLabel }}</el-descriptions-item>
        <el-descriptions-item label="审批人">{{ editRow.curAuditUser.userName }}</el-descriptions-item>
      </el-descriptions>
      <el-form label-width="110px" style="margin-top: 20px" size="small">
        <el-form-item label="通过：">
          <el-switch v-model="pass" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button type="primary" @click="approval">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import useQueryTable from '@/hooks/query-table';
import { computed, reactive, ref } from 'vue';
import { useStore } from 'vuex'
import service from '@/utils/request';

const store = useStore()

const formRef = ref()

const form = reactive({
  applyState: ''
})

const pass = ref(false)

const userInfo = computed(() => store.state.userinfo)

const {
  resetForm,
  filterTable,
  tableData,
  page,
  changePage,
  editRow,
  dialogVisible,
  toggleDialog,
  getList
} = useQueryTable({
  url: '/leave/waiting',
  form,
  formRef
})

const step = computed(() => {
  if (!editRow.value) {
    return {
      active: 1,
      lastText: '审批通过'
    }
  }
  if (editRow.value.applyState < 3) {
    return {
      active: editRow.value.applyState,
      lastText: '审批通过'
    }
  }
  return {
    active: 3,
    lastText: editRow.value.applyStateLabel
  }
})

function approval() {
  service.post('/leave/approval', {
    _id: editRow.value._id,
    pass: pass.value
  })
    .then(() => {
      toggleDialog(false)
      getList()
    })
}
</script>

<style scoped>

</style>
