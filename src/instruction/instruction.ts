import { Directive, DirectiveBinding } from 'vue';
import store from '@/store';

interface Instruction {
  [key: string]: Directive
}

const instruction: Instruction = {
  permission: {
    mounted(el: HTMLBaseElement, permission: DirectiveBinding<string[]>) {
      const isInclude = permission.value.some(item => {
        return !!store.state.btns[item]
      })
      if (!isInclude) {
        el.parentNode?.removeChild(el)
      }
    }
  }
}

export default instruction
