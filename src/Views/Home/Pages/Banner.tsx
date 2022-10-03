import { Button, CircularProgress, Grid } from '@mui/material'
import { APP } from 'Constants/App'
import { useMainPicture } from '../Hooks'
import { PictureContext } from 'Views/Home/Context/PictureContext'
import { BannerList } from 'Views/Home/Organisms'
import { SectionHeading } from 'Components/SectionHeading'

const BannerPage = () => {
  const hook = useMainPicture({ type: 'banner' })
  const { files, onSave, isCreateIsLoading } = hook

  return (
    <PictureContext.Provider value={{ ...hook }}>
      <Grid container rowSpacing={4}>
        <Grid item xs={12}>
          <SectionHeading />
        </Grid>
        <Grid item xs={12}>
          <BannerList />
        </Grid>
        <Grid item xs={12}>
          <Button
            fullWidth
            size='large'
            onClick={onSave}
            disabled={files.length === 0 || isCreateIsLoading}
            startIcon={isCreateIsLoading && <CircularProgress size={20} color='inherit' />}
          >
            {APP.PUBLISH}
          </Button>
        </Grid>
      </Grid>
    </PictureContext.Provider>
  )
}

export default BannerPage