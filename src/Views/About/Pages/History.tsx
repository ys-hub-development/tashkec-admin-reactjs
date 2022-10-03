import { HistoryList } from 'Views/About/Organisms'
import { SectionHeading } from 'Components/SectionHeading'
import { Grid } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { AboutPath, CommonPath } from 'Constants/Navigation'
import { APP } from 'Constants/App'

const HistoryPage = () => {
  const navigate = useNavigate()
  return (
    <Grid container rowSpacing={4}>
      <Grid item xs={12}>
        <SectionHeading
          addTitle={APP.ADD_HISTORY}
          onAdd={() => navigate(`/${AboutPath.main}/${AboutPath.history}/${CommonPath.add}`)}
        />
      </Grid>
      <Grid item xs={12}>
        <HistoryList />
      </Grid>
    </Grid>
  )
}

export default HistoryPage