import { APP } from 'Constants/App'
import { Button, Grid } from '@mui/material'
import { useMainPicture } from 'Views/Home/Hooks'
import { PictureContext } from 'Views/Home/Context'
import { MainPicture } from 'Views/Home/Organisms'
import { SectionHeading } from 'Components/SectionHeading'

const LogoPage = () => {
  const hook = useMainPicture({type: 'logo'})
  const { files } = hook

  return (
    <PictureContext.Provider value={{ ...hook }}>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <SectionHeading />
        </Grid>
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

export default LogoPage