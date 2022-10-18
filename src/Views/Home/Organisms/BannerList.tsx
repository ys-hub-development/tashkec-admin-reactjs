import { Grid } from '@mui/material'
import { BannerForm } from 'Views/Home/Molecules'
import { DropzoneUI } from 'Components/UI'
import { useCallback, useContext, useState } from 'react'
import { PictureContext } from 'Views/Home/Context'
import { useBanner } from 'Hooks'
import cn from 'classnames'
import { updateDialogEvent } from 'Models'
import { APP } from 'Constants/App'
import { ConfirmationDialog } from 'Components/Dialog'
import { PictureItem } from 'Components/Picture'
import { SectionLoader } from 'Components/Section'

export const BannerList = () => {
  const [removeId, setRemoveId] = useState<number | null>(null)
  const { onRemoveLocalFile, onChange, files, type, onRemove: onRemoveBanner, getBannerRemoveLoading } = useContext(PictureContext)
  const {
    listQuery: { data, isLoading, isFetching },
  } = useBanner({ initList: true })

  const onOpenDialog = useCallback((id: number) => {
    updateDialogEvent({
      open: true,
      title: APP.CHANGE_BANNER,
      content: <BannerForm id={id} />,
      props: {
        fullWidth: true,
        maxWidth: 'xs',
      },
    })
  }, [])

  const onRemove = useCallback(() => {
    if (removeId) {
      onRemoveBanner(removeId)
      setRemoveId(null)
    }
  }, [removeId, onRemoveBanner])

  return (
    <SectionLoader isFetching={isFetching} isLoading={isLoading}>
      <ConfirmationDialog open={!!removeId} onClose={() => setRemoveId(null)} onAccept={onRemove} />
      {!isLoading && data && (
        <Grid container spacing={3}>
          {data.map(item => (
            <Grid key={item.id} item xs={6} xl={3}>
              <PictureItem
                id={item.id}
                className={type}
                onRemove={setRemoveId}
                url={item.attachment.path}
                onEdit={onOpenDialog}
                isLoading={getBannerRemoveLoading(item.id)}
              />
            </Grid>
          ))}
          {files.map((item, idx) => (
            <Grid key={idx + 1} item xs={6} xl={3}>
              <PictureItem className={cn(type, 'uploading')} url={item.url} id={item.id} onRemove={onRemoveLocalFile} />
            </Grid>
          ))}
          <Grid item xs={6} xl={3} minHeight={256}>
            <DropzoneUI onChange={onChange} multiple={false} accept={{ 'image/jpeg': [], 'image/jpg': [], 'image/png': [] }} />
          </Grid>
        </Grid>
      )}
    </SectionLoader>
  )
}
