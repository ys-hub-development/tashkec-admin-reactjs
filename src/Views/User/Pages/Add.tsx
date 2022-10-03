import { Grid } from '@mui/material'
import { SectionHeading } from 'Components/SectionHeading'
import { UserForm } from 'Components/User'

export default () => {
  return (
    <Grid container rowSpacing={4}>
      <Grid item xs={12}>
        <SectionHeading />
      </Grid>
      <Grid item xs={12}>
        <UserForm type='user' />
      </Grid>
    </Grid>
  )
}

