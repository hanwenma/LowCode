import { defineComponent, ref, onMounted } from 'vue'

import './index.scss'

export default defineComponent({
  name: 'Block',
  props: {
    modelValue: Object,
  },
  setup(props) {
    const blockRef = ref(null)

    onMounted(() => {
      const { offsetWidth, offsetHeight } = blockRef.value
      props.modelValue.top = props.modelValue.top - offsetHeight / 2
      props.modelValue.left = props.modelValue.left - offsetWidth / 2
    })

    return () => (
      <div
        class="block-components_item"
        ref={blockRef}
        key={props.modelValue.key}
        style={{
          left: props.modelValue.left + 'px',
          top: props.modelValue.top + 'px',
        }}
      >
        {props.modelValue.render()}
      </div>
    )
  },
})
