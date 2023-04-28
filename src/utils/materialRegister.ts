import type { VNode } from 'vue'

interface MaterialItem {
  label: string
  type: string
  preview: () => VNode
  render: () => VNode
}

interface MaterialMap {
  [K: string]: VNode
}

interface Register{
  (item: MaterialItem): void;
}

interface CreateMaterialConfigReturn {
  register: (item: MaterialItem) => void;
  materialMap: MaterialMap;
  materials: MaterialItem[];
}

interface CreateMaterialConfig {
  (data: MaterialItem[]): CreateMaterialConfigReturn
}

const materialMap: MaterialMap = {}
let materials: MaterialItem[] = []

const createMaterialConfig:CreateMaterialConfig = (data: MaterialItem[] = []) => {
  // 初始化支持批量注册
  for (const item of data) {
    register(item)
  }

  return {
    register,
    materialMap,
    materials
  }
}

// 后续注册
const register: Register = (item: MaterialItem) => {
  materials.push(item)
  materialMap[item.type] = item.render
}

export default createMaterialConfig