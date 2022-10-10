import { Grid } from '@mui/material'
import { SectionHeading } from 'Components/SectionHeading'
import { APP } from 'Constants/App'
import { NewsForm } from '../Organisms'

export default () => {
  return (
    <Grid container rowSpacing={4}>
      <Grid item xs={12}>
        <SectionHeading title={APP.ADD_EVENT} />
      </Grid>
      <Grid item xs={12}>
        <NewsForm />
      </Grid>
    </Grid>
  )
}
