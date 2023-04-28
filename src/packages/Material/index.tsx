import { defineComponent, inject } from 'vue'
import './index.scss'

export default defineComponent({
  name: 'Material',
  props: {},
  setup() {
    const materialConfig = inject('materialConfig')

    return () => <div class="material">
      {
        materialConfig.materials.map(item => <div class="material-item">
          <span class="material-item_lable">{item.label}</span>
          <div class="material-item_comp">{item.preview()}</div>
        </div>)
      }
    </div>
  },
})
