import { defineComponent, nextTick, PropType, ref, watch } from 'vue';

export default defineComponent({
  name: 'TreeSelect',
  props: {
    multiple: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    valueKey: {
      type: String,
      default: 'value'
    },
    size: {
      type: String,
      default: ''
    },
    clearable: {
      type: Boolean,
      default: false
    },
    multipleLimit: {
      type: Number,
      default: 1
    },
    placeholder: {
      type: String,
      default: ''
    },
    nodeKey: {
      type: String,
      default: ''
    },
    data: {
      type: Array,
      default() {
        return []
      }
    },
    props: {
      type: Object as PropType<{
        label?: string,
        children?: string,
        disabled?: boolean
      }>,
      default() {
        return {}
      }
    },
    lazy: {
      type: Boolean,
      default: false
    },
    load: {
      type: Function,
      default() {
        return () => {}
      }
    },
    defaultExpandAll: {
      type: Boolean,
      default: false
    },
    modelValue: {
    },
    defaultExpandedKeys: {
      type: Array,
      default() {
        return []
      }
    }
  },
  emits: ['update:modelValue'],
  setup: function (props: any, { emit }) {
    const selectOptions = ref<any[]>([])
    const showDropOver = ref(false)

    function clickNode(node: any) {
      if (!props.multiple) {
        selectOptions.value = [{ ...node }]
        emit('update:modelValue', [node[props.valueKey]])
      }
    }

    function genSelectOptions(nodes: any[], value: any, res: any[] = []) {
      for (let i = 0; i < nodes.length; i++) {
        const key = nodes[i][props.valueKey]
        if (value[key]) {
          res.push(nodes[i])
        }
        if (nodes[i].children && nodes[i].children.length) {
          genSelectOptions(nodes[i].children, value, res)
        }
      }
      return res
    }

    const valueMap: any = {}

    watch(props, () => {
      nextTick(() => {
        if (props.modelValue && props.modelValue.length) {
          props.modelValue.forEach((item: string) => {
            valueMap[item] = true
          })
          selectOptions.value = genSelectOptions(props.data, valueMap)
        }
      })
    })

    function checkChange(list: any) {
      console.log(list);
    }

    function load(node: any, resolve: Function) {
      if (node.data.children && node.data.children.length) {
        resolve([...node.data.children])
        return;
      }
      props.load(node, resolve)
    }

    return () => {
      const modelVal = props.multiple ? props.model : props.modelValue[props.modelValue.length - 1]

      return (
        <div class="tree-select">
          <el-select
            model-value={modelVal}
            multiple={props.multiple}
            popper-append-to-body={false}
            onFocus={() => showDropOver.value = true}
            onBlur={() => showDropOver.value = false}
          >
            {
              selectOptions.value.map(item => {
                return <el-option key={item[props.valueKey]} label={item[props.props.label]} value={item[props.valueKey]}>
                  <div className="drop-over" v-show={showDropOver.value}>
                    <el-tree
                      onCheckChange={checkChange}
                      {...props}
                      load={load}
                      expand-on-click-node={false}
                      showCheckbox={props.multiple}
                      onNodeClick={clickNode}
                    />
                  </div>
                </el-option>
              })
            }
          </el-select>
        </div>
      )
    };
  }
})
