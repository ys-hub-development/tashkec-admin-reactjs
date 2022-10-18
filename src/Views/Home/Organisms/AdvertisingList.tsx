import { usePopup } from 'Hooks'
import { Grid } from '@mui/material'
import { PopupForm, PopupVideoItem } from 'Views/Home/Molecules'
import { useCallback, useState } from 'react'
import { updateDialogEvent } from 'Models'
import { APP } from 'Constants/App'
import { ConfirmationDialog } from 'Components/Dialog'
import { PictureItem } from 'Components/Picture'
import { SectionLoader } from 'Components/Section'

export const AdvertisingList = () => {
  const [removeId, setRemoveId] = useState<number | null>(null)
  const {
    listQuery: { data, isFetching, refetch, isLoading },
    remove,
  } = usePopup({ initList: true })

  const onOpenDialog = useCallback((id: number) => {
    updateDialogEvent({
      title: APP.ADD_POPUP,
      open: true,
      content: <PopupForm id={String(id)} />,
      props: {
        fullWidth: true,
        maxWidth: 'sm',
      },
    })
  }, [])

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

  return (
    <SectionLoader isFetching={isFetching} isLoading={isLoading}>
      <ConfirmationDialog open={!!removeId} onClose={() => setRemoveId(null)} onAccept={onRemove} />
      {!isLoading && data && (
        <Grid container spacing={3}>
          {data.map(item => (
            <Grid key={item.id} item xs={6} xl={3}>
              {item.isImage && item.attachment && (
                <PictureItem
                  id={item.id}
                  className='banner'
                  onRemove={setRemoveId}
                  url={item.attachment.path}
                  onEdit={onOpenDialog}
                  isLoading={getRemoveLoading(item.id)}
                />
              )}
              {!item.isImage && item.videoUrl && (
                <PopupVideoItem
                  id={item.id}
                  className='banner'
                  onRemove={setRemoveId}
                  url={item.videoUrl}
                  onEdit={onOpenDialog}
                  isLoading={getRemoveLoading(item.id)}
                />
              )}
            </Grid>
          ))}
        </Grid>
      )}
    </SectionLoader>
  )
}
