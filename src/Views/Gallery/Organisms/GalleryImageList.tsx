import { Grid } from '@mui/material'
import cn from 'classnames'
import { ConfirmationDialog } from 'Components/Dialog'
import { PictureItem } from 'Components/Picture'
import { SectionLoader } from 'Components/Section'
import { DropzoneUI } from 'Components/UI'
import { APP } from 'Constants/App'
import { MainPathTitle } from 'Constants/Navigation'
import { MainPhotoMutation } from 'Entities/gallery'
import { useAttachments, useGalleryAttachment } from 'Hooks'
import { useCallback, useState } from 'react'
import { useParams } from 'react-router-dom'
import { IParams } from 'Types/app'
import { MainMediaFile } from 'Views/Home/types'

type Props = {
  files: MainMediaFile[]
  onChange: (value: File[]) => void
  onRemoveLocalFile: (id: number) => void
  handleMakeMainImage: (d: MainPhotoMutation) => void
}

export const GalleryImageList = ({ files, onChange, onRemoveLocalFile, handleMakeMainImage }: Props) => {
  const [removeId, setRemoveId] = useState<number | null>(null)
  const { galleryId } = useParams<IParams>()
  const { remove } = useAttachments({ initList: false })

  const {
    listQuery: { data, refetch, isFetching, isLoading },
  } = useGalleryAttachment({
    initList: true,
    extraId: galleryId,
    enabled: !!galleryId,
  })

  const onRemove = useCallback(() => {
    if (removeId) {
      remove.mutate({ id: String(removeId), action: () => refetch() })
      setRemoveId(null)
    }
  }, [refetch, remove, removeId])

  const getRemoveLoading = useCallback(
    (id: number) => {
      return remove.variables?.id === String(id) && (remove.isLoading || isFetching)
    },
    [remove.isLoading, isFetching, remove.variables?.id],
  )

  const onClick = useCallback(
    (id: number) => {
      if (galleryId) {
        handleMakeMainImage({ data: { photoGalleryId: Number(galleryId), attachmentId: id }, action: () => refetch() })
      }
    },
    [galleryId, handleMakeMainImage, refetch],
  )

  return (
    <SectionLoader isFetching={!!galleryId && isFetching} isLoading={!!galleryId && isLoading}>
      <ConfirmationDialog open={!!removeId} onAccept={onRemove} onClose={() => setRemoveId(null)} />
      <Grid container spacing={3}>
        {data &&
          data.map(item => (
            <Grid key={item.id} item xs={3} xl={2.4}>
              <PictureItem
                id={item.id}
                className='banner gallery'
                onRemove={setRemoveId}
                url={item.path}
                isLoading={getRemoveLoading(item.id)}
                hoverAction={!item.mainPhoto ? { title: APP.MAKE_MAIN_PHOTO, action: onClick } : undefined}
                activeTitle={item.mainPhoto ? MainPathTitle.main : undefined}
              />
            </Grid>
          ))}
        {files.map((item, idx) => (
          <Grid key={idx + 1} item xs={3} xl={2.4}>
            <PictureItem url={item.url} id={item.id} className={cn('banner gallery', 'uploading')} onRemove={onRemoveLocalFile} />
          </Grid>
        ))}
        <Grid item xs={3} xl={2.4} minHeight={222}>
          <DropzoneUI onChange={onChange} multiple={false} accept={{ 'image/jpeg': [], 'image/jpg': [], 'image/png': [] }} />
        </Grid>
      </Grid>
    </SectionLoader>
  )
}
