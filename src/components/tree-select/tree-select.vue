<template>
  <el-select
    ref="mySelect"
    v-bind="$attrs"
    :model-value="selectModelVal"
    :multiple="false"
    :disabled="disabled"
    clearable
    @clear="clear"
  >
    <el-option :value="selectedNode[nodeKey] || ''" :label="selectedNode[treeProps.label] || ''" class="options">
      <el-tree
        id="tree-option"
        ref="selectTree"
        :data="options"
        :lazy="lazy"
        :load="load"
        highlight-current
        :expand-on-click-node="false"
        @node-click="handleNodeClick"
        :props="treeProps"
        :default-expanded-keys="defaultExpandedKeys"
        :node-key="nodeKey"
        :current-node-key="selectModelVal"
      />
    </el-option>
  </el-select>
</template>

<script>
import { defineComponent, ref, watch, onMounted, computed } from 'vue';

export default defineComponent({
  name: 'mySelect',
  props: {
    modelValue: { type: Array, default: () => [] },
    disabled: {
      type: Boolean,
      default: false
    },
    nodeKey: {
      type: String
    },
    parentKey: {
      type: String
    },
    treeProps: {
      type: Object,
      default() {
        return {}
      }
    },
    defaultExpandedKeys: {
      type: Array,
      default() {
        return []
      }
    },
    lazy: {
      type: Boolean,
      default: false
    },
    load: {
      type: Function
    },
    options: {
      type: Array,
      default: () => [
        {
          label: '选项1',
          value: '1',
          children: [{ label: '选项1-1', value: '1-1' }]
        },
        { label: '选项2', value: '2' }
      ]
    }
  },
  emits: ['nodeClick', 'update:modelValue'],
  setup(props, context) {
    const selectedNode = ref({})

    function genSelectOptions(nodes) {
      if (!nodes || !nodes.length) return {}
      for (let i = 0; i < nodes.length; i++) {
        if (nodes[i][props.nodeKey] === props.modelValue[props.modelValue.length - 1]) {
          selectedNode.value = nodes[i]
          break
        }
        genSelectOptions(nodes[i].children)
      }
    }

    function clear() {
      context.emit('update:modelValue', [])
    }

    const selectModelVal = computed(() => {
      return props.modelValue[props.modelValue.length - 1]
    })

    watch(props, () => {
      if (!props.modelValue.length) return
      genSelectOptions(props.options)
    });
    onMounted(() => {
      genSelectOptions(props.options)
    });
    const mySelect = ref();

    const optionValue = ref('');
    function handleNodeClick(node) {
      selectedNode.value = node
      mySelect.value.blur();
      context.emit('nodeClick', node);
      const parent = props.parentKey ? node[props.parentKey] : []
      context.emit('update:modelValue', [...parent, node[props.nodeKey]]);
    }
    return {
      mySelect,
      handleNodeClick,
      optionValue,
      selectedNode,
      selectModelVal,
      clear
    };
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.el-scrollbar .el-scrollbar__view .el-select-dropdown__item {
  height: auto;
  max-height: 274px;
  padding: 0;
  overflow: hidden;
  overflow-y: auto;
}
.el-select-dropdown__item.selected {
  font-weight: normal;
}
:deep(.el-tree)  .el-tree-node__content {
  height: auto;
  padding: 0 20px;
}
.el-tree-node__label {
  font-weight: normal;
}
:deep(.el-tree) .is-current .el-tree-node__label {
  color: #409eff;
  font-weight: 700;
}
:deep(.el-tree) .is-current .el-tree-node__children .el-tree-node__label {
  color: #606266;
  font-weight: normal;
}
.selectInput {
  padding: 0 5px;
  box-sizing: border-box;
}
</style>
