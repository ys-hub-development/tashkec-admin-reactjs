import { Grid } from '@mui/material'
import { SectionHeading } from 'Components/SectionHeading'
import { ContactForm } from 'Views/About/Organisms'

export default () => {
  return (
    <Grid container rowSpacing={4}>
      <Grid item xs={12}>
        <SectionHeading />
      </Grid>
      <Grid item xs={12}>
        <ContactForm />
      </Grid>
    </Grid>
  )
}