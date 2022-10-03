import { Grid } from '@mui/material'
import { BannerForm, PictureItem } from 'Views/Home/Molecules'
import { DropzoneUI } from 'Components/UI'
import { useCallback, useContext } from 'react'
import { PictureContext } from 'Views/Home/Context'
import { useBanner } from 'Hooks'
import cn from 'classnames'
import { updateDialogEvent } from 'Models'
import { APP } from 'Constants/App'

export const BannerList = () => {
  const { onRemoveLocalFile, onChange, files, type, onRemove, getBannerRemoveLoading } = useContext(PictureContext)
  const { listQuery: { data } } = useBanner({ initList: true })

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

  return (
    <Grid container spacing={3}>
      {
        data && data.map((item) => (
          <Grid key={item.id} item xs={6} xl={3}>
            <PictureItem
              id={item.id}
              className={type}
              onRemove={onRemove}
              url={item.attachment.path}
              onEdit={onOpenDialog}
              isLoading={getBannerRemoveLoading(item.id)}
            />
          </Grid>
        ))
      }
      {
        files.map((item, idx) => (
          <Grid key={idx + 1} item xs={6} xl={3}>
            <PictureItem className={cn(type, 'uploading')} url={item.url} id={item.id} onRemove={onRemoveLocalFile} />
          </Grid>
        ))
      }
      <Grid item xs={6} xl={3} minHeight={256}>
        <DropzoneUI
          onChange={onChange}
          multiple={false}
          accept={{ 'image/jpeg': [], 'image/jpg': [], 'image/png': [] }}
        />
      </Grid>
    </Grid>
  )
}