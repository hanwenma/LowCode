import { defineComponent, inject } from 'vue'
import './index.scss'

export default defineComponent({
  name: 'Material',
  props: {},
  setup() {
    const materialConfig = inject('materialConfig')

    const dragstart = (e, index) => {
      e.dataTransfer.setData("currCompoIndex", index);
    }

    return () => (
      <div class="material">
        {materialConfig.materials.map((item,index) => (
          <div 
          class="material-item" 
          draggable="true"
          ondragstart={(e) => dragstart(e, index)}
          >
            <span class="material-item_lable">{item.label}</span>
            <div class="material-item_comp">{item.preview()}</div>
          </div>
        ))}
      </div>
    )
  },
})
