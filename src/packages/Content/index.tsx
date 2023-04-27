import { defineComponent } from 'vue'
import Menu from '@packages/Menu'
import './index.scss'

export default defineComponent({
  name: 'Content',
  components:{
    Menu
  },
  props: {},
  setup() {
    return () => <div class="content">
      <Menu />
      Content
    </div>
  },
})
