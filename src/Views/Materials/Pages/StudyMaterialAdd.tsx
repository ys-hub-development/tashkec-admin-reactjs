import { Grid } from '@mui/material'
import { SectionHeading } from 'Components/Section'
import { APP } from 'Constants/App'
import { StudyMaterialForm } from 'Views/Materials/Organisms'

export default () => {
  return (
    <Grid container rowSpacing={4}>
      <Grid item xs={12}>
        <SectionHeading title={APP.ADD_STDUY_MATERIAL} />
      </Grid>
      <Grid item xs={12}>
        <StudyMaterialForm />
      </Grid>
    </Grid>
  )
}