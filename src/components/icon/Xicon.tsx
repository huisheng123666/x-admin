import { defineComponent } from 'vue'
import * as icons from '@element-plus/icons'

const Xicon = defineComponent({
  name: 'XIcon',
  props: {
    name: {
      type: String,
      default: ''
    },
    size: {
      type: Number,
      default: 0
    }
  },
  setup(props) {
    const Icon = (icons as any)[props.name]

    return () => {
      return <el-icon size={props.size}>
        <Icon />
      </el-icon>
    }
  }
})

export default Xicon
