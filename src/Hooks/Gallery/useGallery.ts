import { useCRUDApi } from 'Hooks/App'
import { ControllerHookProps } from 'Types/app'
import { IGallery } from 'Entities/gallery'

type Props = ControllerHookProps

export function useGallery(p: Props) {
  return useCRUDApi<IGallery[], IGallery, Partial<IGallery>>({
    key: 'gallery',
    url: '/api/photogalleries',
    enabled: true,
    ...p,
  })
}