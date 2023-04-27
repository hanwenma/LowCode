import { defineComponent } from 'vue'
import './index.scss'

export default defineComponent({
  name: 'Editor',
  props: {},
  setup() {
    return () => <div class="editor">Editor</div>
  },
})
