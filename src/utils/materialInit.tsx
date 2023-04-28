import { ElInput, ElButton, ElImage, ElText, ElSelect } from 'element-plus'
import type { ComponentPublicInstance } from 'vue'
import createMaterialConfig from '@utils/materialRegister'
import vueLogo from '@assets/vue.svg'

const materialConfig = createMaterialConfig([
  {
    label: '文本',
    type: 'text',
    preview: () => <ElText>预览文本</ElText>,
    render: () => <ElText>渲染文本</ElText>,
  },
  {
    label: '输入框',
    type: 'input',
    preview: () => <ElInput placeholder="预览输入框" />,
    render: () => <ElInput placeholder="渲染输入框" />,
  },
  {
    label: '下拉框',
    type: 'select',
    preview: () => <ElSelect placeholder="预览输入框"></ElSelect>,
    render: () => <ElSelect placeholder="渲染输入框"></ElSelect>,
  },
  {
    label: '按钮',
    type: 'button',
    preview: () => <ElButton>预览按钮</ElButton>,
    render: () => <ElButton>渲染按钮</ElButton>,
  },
  {
    label: '图片',
    type: 'image',
    preview: () => <ElImage title="预览图片" src={vueLogo} />,
    render: () => <ElImage title="渲染图片" src={vueLogo} />,
  },
])

export default {
  install(app: ComponentPublicInstance) {
    app.provide('materialConfig', materialConfig)
  },
}
