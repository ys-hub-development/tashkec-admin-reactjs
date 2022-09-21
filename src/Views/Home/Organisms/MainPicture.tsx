import { Grid } from '@mui/material'
import { PictureItem } from 'Views/Home/Molecules'
import { DropzoneUI } from 'Components/UI'
import { useContext, useMemo } from 'react'
import { PictureContext } from 'Views/Home/Context/PictureContext'

const numbers: number[] = [ 1, 2, 3, 4, 5 ]

export const MainPicture = () => {
  const { onRemoveLocalFile, onChange, files, type, onRemove } = useContext(PictureContext)
  const ext = useMemo(() => type === 'banner' ? 'jpg' : 'png', [ type ])
  const isBanner = useMemo(() => type === 'banner', [ type ])
  const isLogo = useMemo(() => type === 'logo', [ type ])

  return (
    <Grid container spacing={3}>
      {
        numbers.map(item => (
          <Grid key={item} item xs={isBanner ? 6 : 3} xl={isLogo ? 2 : 3}>
            <PictureItem
              className={type}
              url={`/media/images/${type}/${type}-${item}.${ext}`}
              onRemove={onRemove} id={item}
            />
          </Grid>
        ))
      }
      {
        files.map((item, idx) => (
          <Grid key={idx + 1} item xs={isBanner ? 6 : 3} xl={isLogo ? 2 : 3}>
            <PictureItem className={type} url={item.url} id={item.id} onRemove={onRemoveLocalFile} />
          </Grid>
        ))
      }
      <Grid item xs={isBanner ? 6 : 3} xl={isLogo ? 2 : 3}>
        <DropzoneUI
          onChange={onChange}
          multiple={false}
          accept={{ 'image/jpeg': [], 'image/jpg': [], 'image/png': [] }}
        />
      </Grid>
    </Grid>
  )
}