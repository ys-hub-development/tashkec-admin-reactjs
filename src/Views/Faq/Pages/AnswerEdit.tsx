import { Grid } from '@mui/material'
import { SectionHeading } from 'Components/Section'
import { APP } from 'Constants/App'
import { AnswerForm } from 'Views/Faq/Organisms'

export default () => {
  return (
    <Grid container rowSpacing={4}>
      <Grid item xs={12}>
        <SectionHeading title={APP.EDIT_ANSWER} />
      </Grid>
      <Grid item xs={12}>
        <AnswerForm />
      </Grid>
    </Grid>
  )
}