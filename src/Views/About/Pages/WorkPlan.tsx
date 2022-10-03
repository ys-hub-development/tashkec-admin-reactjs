import { Grid } from '@mui/material'
import { SectionHeading } from 'Components/SectionHeading'
import { AboutPath, CommonPath } from 'Constants/Navigation'
import { useNavigate } from 'react-router-dom'
import { WorkPlanList } from '../Organisms'
import { APP } from 'Constants/App'

export default () => {
  const navigate = useNavigate()

  return (
    <Grid container rowSpacing={4}>
      <Grid item xs={12}>
        <SectionHeading addTitle={APP.ADD_PLAN} onAdd={() => navigate(`/${AboutPath.main}/${AboutPath.plan}/${CommonPath.add}`)} />
      </Grid>
      <Grid item xs={12}>
        <WorkPlanList />
      </Grid>
    </Grid>
  )
}