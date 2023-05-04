import { defineComponent, inject, ref } from 'vue'
import { v4 as uuidv4 } from 'uuid'
import Menu from '@packages/Menu'
import Block from '@packages/Block'
import './index.scss'

export default defineComponent({
  name: 'Content',
  components: {
    Menu,
    Block
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

    return () => (
      <div
        class="content"
        ondragenter={dragenter}
        ondragover={dragover}
        ondragleave={dragleave}
        ondrop={drop}
      >
        <Menu />
        <div class="content-components">
          {components.value.map((component) => (
            <Block v-model={component} />
          ))}
        </div>
      </div>
    )
  },
})
