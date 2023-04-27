import { defineComponent } from 'vue'
import './index.scss'

export default defineComponent({
  name: 'Material',
  props: {},
  setup() {
    return () => <div class="material">Material</div>
  },
})
