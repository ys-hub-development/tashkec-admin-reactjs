import { Grid } from '@mui/material'
import { DropzoneUI } from 'Components/UI'
import { useContext } from 'react'
import { PictureContext } from 'Views/Home/Context/PictureContext'
import { useLogo } from 'Hooks/Home/useLogo'
import { PictureItem } from 'Components/Picture'


export const LogoList = () => {
  const { onRemoveLocalFile, onChange, files, type, onRemove } = useContext(PictureContext)
  const { listQuery: { data } } = useLogo({ initList: true })

  return (
    <Grid container spacing={3}>
      {
        data && data.map((item) => (
          <Grid key={item.id} item xs={3} xl={2}>
            <PictureItem
              id={item.id}
              url={item.path}
              className={type}
              onRemove={onRemove}
            />
          </Grid>
        ))
      }
      {
        files.map((item, idx) => (
          <Grid key={idx + 1} item xs={3} xl={2}>
            <PictureItem className={type} url={item.url} id={item.id} onRemove={onRemoveLocalFile} />
          </Grid>
        ))
      }
      <Grid item xs={3} xl={2} minHeight={256}>
        <DropzoneUI
          multiple={false}
          onChange={onChange}
          accept={{ 'image/jpeg': [], 'image/jpg': [], 'image/png': [] }}
        />
      </Grid>
    </Grid>
  )
}