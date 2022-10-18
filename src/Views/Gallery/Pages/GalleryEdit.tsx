import { Grid } from '@mui/material'
import { SectionHeading } from 'Components/Section'
import { APP } from 'Constants/App'
import { GalleryForm } from 'Views/Gallery/Organisms'

export default () => {
  return (
    <Grid container rowSpacing={4}>
      <Grid item xs={12}>
        <SectionHeading title={APP.EDIT_GALLERY} />
      </Grid>
      <Grid item xs={12}>
        <GalleryForm />
      </Grid>
    </Grid>
  )
}