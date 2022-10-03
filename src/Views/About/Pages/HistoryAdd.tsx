import { Grid } from '@mui/material'
import { SectionHeading } from 'Components/SectionHeading'
import { APP } from 'Constants/App'
import { HistoryForm } from 'Views/About/Organisms'

export default () => {
  return (
    <Grid container rowSpacing={4}>
      <Grid item xs={12}>
        <SectionHeading title={APP.ADD_HISTORY} />
      </Grid>
      <Grid item xs={12}>
        <HistoryForm />
      </Grid>
    </Grid>
  )
}