import { Grid } from '@mui/material'
import { SectionHeading } from 'Components/SectionHeading'
import { APP } from 'Constants/App'
import { WorkPlanForm } from 'Views/About/Organisms'

export default () => {
  return (
    <Grid container rowSpacing={4}>
      <Grid item xs={12}>
        <SectionHeading title={APP.ADD_PLAN} />
      </Grid>
      <Grid item xs={12}>
        <WorkPlanForm />
      </Grid>
    </Grid>
  )
}