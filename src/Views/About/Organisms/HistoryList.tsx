import { MainCard } from 'Components/Cards'
import { Grid } from '@mui/material'
import { fakeHistoryList } from 'Data/app'
import { format } from 'date-fns'

export const HistoryList = () => {
  return (
    <Grid container rowSpacing={2}>
      {
        fakeHistoryList.map(item => (
          <Grid item key={item.id} xs={12}>
            <MainCard
              onEdit={(id) => id}
              onRemove={(id) => id}
              id={item.id} text={item.text}
              date={format(new Date(), 'dd/MM/yyyy')}
            />
          </Grid>
        ))
      }
    </Grid>
  )
}