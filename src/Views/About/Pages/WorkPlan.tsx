import { Grid } from '@mui/material'
import { SectionHeading } from 'Components/Section'
import { AboutPath, CommonPath } from 'Constants/Navigation'
import { useNavigate } from 'react-router-dom'
import { WorkPlanList } from '../Organisms'
import { APP } from 'Constants/App'
import { WorkplantFilter } from '../Molecules'

export default () => {
  const navigate = useNavigate()

  return (
    <Grid container rowSpacing={4}>
      <Grid item xs={12}>
        <SectionHeading
          langFilter
          addTitle={APP.ADD_PLAN}
          onAdd={() => navigate(`/${AboutPath.main}/${AboutPath.plan}/${CommonPath.add}`)}
          filter={<WorkplantFilter />}
        />
      </Grid>
      <Grid item xs={12}>
        <WorkPlanList />
      </Grid>
    </Grid>
  )
}
