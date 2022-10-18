import { Grid } from '@mui/material'
import { SectionHeading } from 'Components/Section'
import { APP } from 'Constants/App'
import { NewsForm } from '../Organisms'

export default () => {
  return (
    <Grid container rowSpacing={4}>
      <Grid item xs={12}>
        <SectionHeading title={APP.EDIT_NEWS} />
      </Grid>
      <Grid item xs={12}>
        <NewsForm />
      </Grid>
    </Grid>
  )
}
