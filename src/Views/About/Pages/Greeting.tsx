import { GreetingForm } from 'Views/About/Organisms'
import { Grid } from '@mui/material'
import { SectionHeading } from 'Components/SectionHeading'

const GreetingPage = () => {
  return (
    <Grid container rowSpacing={4}>
      <Grid item xs={12}>
        <SectionHeading />
      </Grid>
      <Grid item xs={12}>
        <GreetingForm />
      </Grid>
    </Grid>
  )
}

export default GreetingPage