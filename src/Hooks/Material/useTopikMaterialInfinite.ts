import { useInfiniteList } from 'Hooks/App'
import { ITopikMaterial } from 'Entities/material'

export function useTopikMaterialInfinite(enabled: boolean) {
  return useInfiniteList<ITopikMaterial>({
    url: '/api/materials-of-topics',
    key: 'MaterialOfTopicInfinite',
    enabled,
  })
}