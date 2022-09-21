import { Button, Grid } from '@mui/material'
import { APP } from 'Constants/App'
import { useMainPicture } from '../Hooks'
import { PictureContext } from 'Views/Home/Context/PictureContext'
import { MainPicture } from 'Views/Home/Organisms'

const BannerPage = () => {
  const hook = useMainPicture({ type: 'banner' })
  const { files } = hook

  return (
    <PictureContext.Provider value={{ ...hook }}>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <MainPicture />
        </Grid>
        <Grid item xs={12}>
          <Button disabled={files.length === 0} size='large' fullWidth>
            {APP.PUBLISH}
          </Button>
        </Grid>
      </Grid>
    </PictureContext.Provider>
  )
}

export default BannerPage