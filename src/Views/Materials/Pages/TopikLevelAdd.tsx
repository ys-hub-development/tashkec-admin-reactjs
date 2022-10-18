import { Grid } from '@mui/material'
import { SectionHeading } from 'Components/Section'
import { APP } from 'Constants/App'
import { TopikLevelForm } from 'Views/Materials/Organisms'

export default () => {
  return (
    <Grid container rowSpacing={4}>
      <Grid item xs={12}>
        <SectionHeading title={APP.ADD_TOPIK_LEVEL} />
      </Grid>
      <Grid item xs={12}>
        <TopikLevelForm />
      </Grid>
    </Grid>
  )
}