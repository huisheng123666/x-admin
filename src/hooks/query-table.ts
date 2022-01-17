import { Ref, reactive, onMounted, ref } from 'vue'
import service from '@/utils/request';
import { ElMessageBox } from 'element-plus'

interface Page {
  pageNum: number
  pageSize: number
  total: number
}

interface QueryParams<T> {
  form: T
  formRef: Ref<any>
  url: string
  deleteUrl?: string
  tableRef?: Ref<any>
}

function useQueryTable<T>({ form, formRef, url, deleteUrl = '', tableRef }: QueryParams<T>) {
  const page = reactive<Page>({
    pageNum: 1,
    pageSize: 10,
    total: 0
  })

  const tableData = ref<any[]>([])
  const tableLoading = ref(true)
  const selectedList = ref<number[]>([])
  const editRow = ref<any>()
  const dialogVisible = ref(false)

  const getList = () => {
    tableLoading.value = true
    service.get<any, {
      page: Page,
      list: any[]
    }>(url, {
      params: {
        ...form,
        ...page
      }
    })
      .then(({ page: pageData, list }) => {
        page.pageNum = pageData.pageNum
        page.pageSize = pageData.pageSize
        page.total = pageData.total
        if (tableRef && tableRef.value) {
          tableRef.value.store.states.treeData.value = {}
          tableRef.value.store.states.lazyTreeNodeMap.value = {}
        }
        tableData.value = list
        tableLoading.value = false
      })
      .catch(() => {
        tableLoading.value = false
        if (page.pageNum > 1) {
          page.pageNum -= 1
        }
      })
  }

  const filterTable = () => {
    page.pageNum = 1
    getList()
  }

  const resetForm = () => {
    formRef.value.resetFields()
    filterTable()
  }

  const changePage = (pageNum: number) => {
    page.pageNum = pageNum
    getList()
  }

  onMounted(() => {
    getList()
  })

  const selectionChange = (val: any[]) => {
    selectedList.value = val.map(item => item.userId)
  }

  const deleteRows = (id: number, key: string, isBatch: boolean = true, callback?: () => void) => {
    ElMessageBox.confirm('确认删除吗？', '警告', {
      confirmButtonText: '确认',
      cancelButtonText: '取消'
    })
      .then(() => {
        service.post(deleteUrl, {
          [key]: id ? (isBatch ? [id] : id) : selectedList.value,
          action: 'delete'
        })
          .then(() => {
            callback && callback()
            getList()
          })
      })
  }

  const updateList = () => {
    editRow.value = null
    getList()
  }

  const toggleDialog = (show: boolean, row: any = null) => {
    dialogVisible.value = show
    editRow.value = row
  }

  return {
    resetForm,
    getList,
    page,
    tableData,
    tableLoading,
    changePage,
    filterTable,
    selectedList,
    selectionChange,
    deleteRows,
    updateList,
    editRow,
    dialogVisible,
    toggleDialog
  }
}

export default useQueryTable
