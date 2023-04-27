import { defineComponent } from 'vue'
import './index.scss'

export default defineComponent({
  name: 'Menu',
  props: {},
  setup() {
    return () => <div class="menu">Menu</div>
  },
})
