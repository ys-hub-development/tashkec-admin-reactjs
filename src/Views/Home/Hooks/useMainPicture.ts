import { useCallback, useState } from 'react'
import { MainMediaFile } from 'Views/Home/types'
import { fileToBase64 } from 'Utils'

type Props = {
  type: 'banner' | 'logo'
}

export function useMainPicture({ type }: Props) {
  const [ files, setFiles ] = useState<MainMediaFile[]>([])

  const onChange = useCallback(async (files: File[]) => {
    const tmp: MainMediaFile[] = []

    for (const file of files) {
      const url = await fileToBase64(file)
      if (typeof url === 'string') {
        tmp.push({
          id: new Date().getTime(),
          url,
          file,
        })
      }
    }

    setFiles(tmp)

  }, [])

  const onRemoveLocalFile = useCallback((id: number) => {
    setFiles((data) => [ ...data ].filter(item => item.id !== id))
  }, [])

  const onRemove = useCallback((id: number) => {
    if (type === 'banner') {
      console.log(id)
    } else {
      console.log(id)
    }
  }, [type])

  return { files, onChange, onRemoveLocalFile, onRemove, type }
}