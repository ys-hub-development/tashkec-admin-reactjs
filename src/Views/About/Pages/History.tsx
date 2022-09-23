import { HistoryList } from 'Views/About/Organisms'
import { SectionHeading } from 'Components/SectionHeading'
import { Grid } from '@mui/material'

const HistoryPage = () => {
  return (
    <Grid container rowSpacing={4}>
      <Grid item xs={12}>
        <SectionHeading />
      </Grid>
      <Grid item xs={12}>
        <HistoryList />
      </Grid>
    </Grid>
  )
}

export default HistoryPage