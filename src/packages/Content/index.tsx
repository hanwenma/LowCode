import { defineComponent, inject, ref } from 'vue'
import { v4 as uuidv4 } from 'uuid';
import Menu from '@packages/Menu'
import './index.scss'

export default defineComponent({
  name: 'Content',
  components: {
    Menu,
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
        attribute: {
          left: e.target.clientX,
          top: e.target.clientY,
        },
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
          {components.value.map((compo) => (
            <div class="content-components_item" key={compo.key} {...compo.attribute}>
              {compo.render()}
            </div>
          ))}
        </div>
      </div>
    )
  },
})
