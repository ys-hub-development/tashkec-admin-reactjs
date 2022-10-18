import { useCallback, useMemo, useState } from 'react'
import { MainMediaFile } from 'Views/Home/types'
import { fileToBase64 } from 'Utils'
import { useBanner } from 'Hooks'
import { useLogo } from 'Hooks/Home/useLogo'

type Props = {
  type: 'banner' | 'logo'
}

export function useMainPicture({ type }: Props) {
  const [ files, setFiles ] = useState<MainMediaFile[]>([])
  const { create: bannerCreate, remove: bannerRemove, listQuery: bannerList } = useBanner({ initList: false })
  const { listQuery: logoList, create: logoCreate, remove: logoRemove } = useLogo({ initList: false })

  const onChange = useCallback(async (files: File[]) => {
    const tmp: MainMediaFile[] = []

    for (const file of files) {
      const url = await fileToBase64(file)
      if (typeof url === 'string') {
        tmp.push({
          id: new Date().getTime(),
          url,
          file,
          status: false,
        })
      }
    }

    setFiles((f) => [...f, ...tmp])
  }, [])

  const onRemoveLocalFile = useCallback((id: number) => {
    setFiles((data) => [ ...data ].filter(item => item.id !== id))
  }, [])

  const onSuccessAction = useCallback((update?: boolean) => {
    if (type === 'banner') {
      bannerList.refetch()
        .then(() => {
          if (update) {
            setFiles([])
          }
        })
    } else {
      logoList.refetch()
        .then(() => {
          if (update) {
            setFiles([])
          }
        })
    }
  }, [ bannerList, logoList, type ])

  const onRemove = useCallback((id: number) => {
    if (type === 'banner') {
      bannerRemove.mutate({ id: String(id), action: () => onSuccessAction() })
    } else {
      logoRemove.mutate({ id: String(id), action: () => onSuccessAction() })
    }
  }, [ type, bannerRemove, onSuccessAction, logoRemove ])

  const onSave = useCallback(() => {
    if (files.length > 0) {
      const formData = new FormData()
      for (const item of files) {
        formData.append('files', item.file)
      }
      if (type === 'banner') {
        bannerCreate.mutate({ data: formData, action: () => onSuccessAction(true) })
      } else {
        logoCreate.mutate({ data: formData, action: () => onSuccessAction(true) })
      }
    }
  }, [ bannerCreate, files, logoCreate, onSuccessAction, type ])

  const getBannerRemoveLoading = useCallback((id: number) => {
    return bannerRemove.variables?.id === String(id) && (bannerRemove.isLoading || bannerList.isFetching)
  }, [ bannerRemove.isLoading, bannerList.isFetching, bannerRemove.variables?.id ])

  const getLogoLoading = useCallback((id: number) => {
    return logoRemove.variables?.id === String(id) && (logoRemove.isLoading || logoList.isFetching)
  }, [ logoRemove.isLoading, logoList.isFetching, logoRemove.variables?.id ])

  const isCreateIsLoading = useMemo(() => bannerCreate.isLoading || logoCreate.isLoading,
    [ bannerCreate.isLoading, logoCreate.isLoading ])

  return {
    files,
    onChange,
    onRemoveLocalFile,
    onRemove,
    type,
    onSave,
    getBannerRemoveLoading,
    isCreateIsLoading,
    getLogoLoading,
  }
}