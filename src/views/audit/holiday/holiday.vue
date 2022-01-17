<template>
  <div class="holiday">
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
      <div class="action">
        <el-button @click="toggleDialog(true)" type="primary">申请休假</el-button>
      </div>
      <el-table :data="tableData" v-loading="tableLoading">
        <el-table-column label="单号" prop="orderNo" />
        <el-table-column label="休假时间" show-overflow-tooltip prop="startTime" />
        <el-table-column label="休假时长" prop="leaveTime" />
        <el-table-column label="休假类型" prop="applyTypeLabel" />
        <el-table-column label="休假原因" prop="reasons" />
        <el-table-column label="申请时间" show-overflow-tooltip prop="createTime" />
        <el-table-column label="审批人" prop="curAuditUserName" />
        <el-table-column label="当前审批人" prop="curAuditUser.userName" show-overflow-tooltip />
        <el-table-column label="当前状态" prop="applyStateLabel" />
        <el-table-column label="操作" width="150">
          <template #default="scope">
            <el-button size="mini" @click="toggleDetailDia(true, scope.row)">查看</el-button>
            <el-button :disabled="scope.row.applyState > 2" size="mini" type="danger" @click="deleteRow(scope.row)">作废</el-button>
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

    <add-holiday :visible="dialogVisible" @close="toggleDialog(false)" @update="getList" />

    <el-dialog
      v-if="detailDialog"
      title="休假详情"
      width="600px"
      v-model="detailDialog"
      @close="toggleDetailDia(false)"
      destroy-on-close
    >
      <el-steps :active="step.active" align-center>
        <el-step title="待审批"></el-step>
        <el-step title="审批中"></el-step>
        <el-step :title="step.lastText"></el-step>
      </el-steps>
      <el-descriptions :column="2" style="margin-top: 20px; padding: 0 65px" size="normal">
        <el-descriptions-item label="休假类型">{{ editRow.applyTypeLabel }}</el-descriptions-item>
        <el-descriptions-item label="休假时间">{{ editRow.startTime }}</el-descriptions-item>
        <el-descriptions-item label="休假时长">{{ editRow.leaveTime }}</el-descriptions-item>
        <el-descriptions-item label="休假原因">{{ editRow.reasons }}</el-descriptions-item>
        <el-descriptions-item label="审批状态">{{ editRow.applyStateLabel }}</el-descriptions-item>
        <el-descriptions-item label="审批人">{{ editRow.curAuditUser.userName }}</el-descriptions-item>
      </el-descriptions>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import useQueryTable from '@/hooks/query-table';
import { computed, reactive, ref } from 'vue';
import AddHoliday from '@/components/audit/add-holiday.vue';
import { ElMessageBox } from 'element-plus';
import service from '@/utils/request';

const formRef = ref()
const detailDialog = ref(false)

const form = reactive({
  applyState: ''
})

const {
  tableData,
  filterTable,
  resetForm,
  tableLoading,
  page,
  dialogVisible,
  toggleDialog,
  changePage,
  editRow,
  getList
} = useQueryTable({
  url: '/leave/list',
  formRef,
  form
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

function toggleDetailDia(show: boolean, row: any = null) {
  detailDialog.value = show
  editRow.value = row
}

function deleteRow(row: any) {
  ElMessageBox.confirm('确认作废该申请', '警告', {
    confirmButtonText: '确认',
    cancelButtonText: '取消'
  })
    .then(data => {
      service.post('/leave/operate', {
        _id: row._id,
        action: 'delete'
      })
        .then(getList)
    })
}
</script>

<style scoped>

</style>
