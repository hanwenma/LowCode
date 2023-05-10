import { defineComponent, inject, ref, computed } from 'vue'
import { v4 as uuidv4 } from 'uuid'
import Menu from '@packages/Menu'
import Block from '@packages/Block'
import './index.scss'

export default defineComponent({
  name: 'Content',
  components: {
    Menu,
    Block,
  },
  props: {},
  setup() {
    const materialConfig = inject('materialConfig')

    const components = ref([])

    const dragenter = (e) => {
      e.dataTransfer.dropEffect = 'move'
    }

    const dragover = (e) => {
      // 必须阻止默认事件，否则不能触发 drop 事件
      e.preventDefault()
    }

    const dragleave = (e) => {
      e.dataTransfer.dropEffect = 'none'
    }

    const drop = (e) => {
      const currComponent =
        materialConfig.materials[e.dataTransfer.getData('currCompoIndex')]
      components.value.push({
        ...currComponent,
        key: uuidv4(),
        left: e.offsetX,
        top: e.offsetY,
      })
    }

    const clearUpEvent = () => {
      // 解绑事件
      document.removeEventListener('mousemove', mousemove)
      document.removeEventListener('mouseup', mouseup)
    }

    const clearUpFocus = () => {
      components.value.forEach((comp) => {
        comp.focus = false
      })
    }

    // 元素的初始位置
    let dragStartState = {
      startX: 0,
      startY: 0,
      startPos: [],
    }

    // 选中的组件
    const focusCompos = computed(() => components.value.filter((v) => v.focus))

    // 获取焦点
    const mousedown = (e, component) => {
      e.preventDefault()
      e.stopPropagation()

      // 多选：shift + mousedown
      // 单选: 重置其他选中状态
      if (!e.shiftKey) {
        clearUpFocus()
      }
      // 改变选中状态
      component.focus = !component.focus

      // 记录元素当前的位置
      dragStartState = {
        startX: e.clientX,
        startY: e.clientY,
        startPos: focusCompos.value.map(({ left, top }) => ({
          left,
          top,
        })),
      }

      // 绑定事件
      document.addEventListener('mousemove', mousemove)
      document.addEventListener('mouseup', mouseup)
    }

    // 元素移动
    const mousemove = (e) => {
      const { clientX, clientY } = e

      // 计算偏移量
      const durX = clientX - dragStartState.startX
      const durY = clientY - dragStartState.startY

      // 重新赋值
      focusCompos.value.forEach((v, i) => {
        v.left = dragStartState.startPos[i].left + durX
        v.top = dragStartState.startPos[i].top + durY
      })
    }

    // 移动停止
    const mouseup = (e) => {
      // 清空事件
      clearUpEvent()
    }

    return () => (
      <div
        class="content"
        ondragenter={dragenter}
        ondragover={dragover}
        ondragleave={dragleave}
        ondrop={drop}
      >
        <Menu />
        <div class="content-components" onmousedown={clearUpFocus}>
          {components.value.map((component) => (
            <Block
              v-model={component}
              onmousedown={(e) => mousedown(e, component)}
            />
          ))}
        </div>
      </div>
    )
  },
})
