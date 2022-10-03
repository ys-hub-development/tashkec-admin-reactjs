import { usePopup } from 'Hooks'
import { Grid } from '@mui/material'
import { PictureItem, PopupForm, PopupVideoItem } from 'Views/Home/Molecules'
import { useCallback } from 'react'
import { updateDialogEvent } from 'Models'
import { APP } from 'Constants/App'

export const AdvertisingList = () => {
  const { listQuery: { data, isFetching, refetch }, remove } = usePopup({ initList: true })

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

  const onRemove = useCallback((id: number) => {
    remove.mutate({id: String(id), action: () => refetch()})
  }, [refetch, remove])

  const getRemoveLoading = useCallback((id: number) => {
    return remove.variables?.id === String(id) && (remove.isLoading || isFetching)
  }, [ remove.isLoading, isFetching, remove.variables?.id ])

  return (
    <Grid container spacing={3}>
      {
        data && data.map((item) => (
          <Grid key={item.id} item xs={6} xl={3}>
            {
              item.isImage && item.attachment &&
              (

                <PictureItem
                  id={item.id}
                  className='banner'
                  onRemove={onRemove}
                  url={item.attachment.path}
                  onEdit={onOpenDialog}
                  isLoading={getRemoveLoading(item.id)}
                />
              )
            }
            {
              !item.isImage && item.videoUrl && (
                <PopupVideoItem
                  id={item.id}
                  className='banner'
                  onRemove={onRemove}
                  url={item.videoUrl}
                  onEdit={onOpenDialog}
                  isLoading={getRemoveLoading(item.id)}
                />
              )
            }
          </Grid>
        ))
      }
    </Grid>
  )
}