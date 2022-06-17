<template>
<div class="movie">
  <div class="query-form">
    <el-form :model="form" ref="formRef" inline size="mini">
      <el-form-item prop="name">
        <el-input placeholder="请输入电影名" v-model="form.name" />
      </el-form-item>
      <el-form-item prop="type">
        <el-select v-model="form.type">
          <el-option :value="1" label="电影" />
          <el-option :value="14" label="电视剧" />
          <el-option :value="21" label="综艺" />
          <el-option :value="26" label="动漫" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="filterTable">搜索</el-button>
        <el-button type="warning" @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
  <div class="base-table">
    <div class="action">
      <el-form inline size="mini" :model="singleForm" ref="singleFormRef">
        <el-form-item label="id:" prop="id" required>
          <el-input v-model="singleForm.id" />
        </el-form-item>
        <el-form-item prop="type" required>
          <el-select v-model="singleForm.type">
            <el-option :value="1" label="电影" />
            <el-option :value="14" label="电视剧" />
            <el-option :value="21" label="综艺" />
            <el-option :value="26" label="动漫" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getMovieById">单条获取</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table
      :data="tableData"
    >
      <el-table-column label="名称" prop="title" width="120px" show-overflow-tooltip />
      <el-table-column label="封面" width="180px">
        <template #default="scope">
          <el-image
            :src="scope.row.cover"
            style="width: 80px; height: 45px"
            fit="cover"
            :preview-src-list="[scope.row.cover]"
          />
        </template>
      </el-table-column>
      <el-table-column label="导演" prop="director" min-width="120px" show-overflow-tooltip />
      <el-table-column label="演员" prop="actor" min-width="120px" show-overflow-tooltip />
      <el-table-column label="语言" prop="language" width="80px" />
      <el-table-column label="地区" prop="area" width="80px" />
      <el-table-column label="类型" prop="category" width="80px" />
      <el-table-column label="简介" prop="intro" min-width="200px" show-overflow-tooltip />
      <el-table-column label="操作" fixed="right" width="100px">
        <template #default="scope">
          <el-button @click="deleteRow(scope.row)" type="text" style="color: red;">删除</el-button>
          <el-button @click="togglePlayer(true, scope.row)" type="text">试播</el-button>
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
    :title="editRow?.title"
    :model-value="showPlayer"
    width="800px"
    @close="togglePlayer(false)"
    @opened="playVideo"
  >
    <div class="player" id="dplayer"></div>
  </el-dialog>
</div>
</template>

<script lang="ts" setup>
import useQueryTable from '@/hooks/query-table';
import { reactive, ref } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import service from '@/utils/request';
import DPlayer from 'dplayer'

const form = reactive({
  type: '',
  name: ''
})

const formRef = ref()

const {
  tableData,
  page,
  changePage,
  filterTable,
  resetForm,
  getList,
  editRow
} = useQueryTable({
  url: '/movie/list',
  form,
  formRef
})

function deleteRow(row: any) {
  ElMessageBox.confirm('确认删除该电影？', '提示')
    .then(() => {
      service.delete('/movie/' + row.id)
        .then(() => {
          getList()
        })
    })
}

const singleForm = reactive({
  id: '',
  type: ''
})

const singleFormRef = ref()

function getMovieById() {
  singleFormRef.value.validate((valid: boolean) => {
    if (valid) {
      service.post('/movie/single', {
        ...singleForm
      })
        .then(data => {
          ElMessage.success('获取成功')
          filterTable()
        })
    }
  })
}

const showPlayer = ref(false)

const player = ref<any>()

function togglePlayer(show: boolean, row: any = null) {
  showPlayer.value = show
  editRow.value = row
  if (!show) {
    player.value.destroy()
  }
}

function playVideo() {
  console.log(editRow.value.playUrls[1][0])
  player.value = new DPlayer({
    container: document.getElementById('dplayer'),
    video: {
      url: editRow.value.playUrls[1][0]
    }
  });
}
</script>

<style lang="stylus" scoped>
.player
  width 100%
  height 400px
  background #000
</style>