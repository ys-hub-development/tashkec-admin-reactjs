import { useNavigate } from 'react-router-dom'
import { useCallback } from 'react'
import { CommonPath, MaterialPath } from 'Constants/Navigation'
import { Grid } from '@mui/material'
import { SectionHeading } from 'Components/Section'
import { APP } from 'Constants/App'
import { TopikLevelList } from 'Views/Materials/Organisms'

export default () => {
  const navigate = useNavigate()

  const onAdd = useCallback(() => {
    navigate(`/${MaterialPath.main}/${MaterialPath['topik-levels']}/${CommonPath.add}`)
  }, [navigate])

  return (
    <Grid container rowSpacing={4}>
      <Grid item xs={12}>
        <SectionHeading onAdd={onAdd} addTitle={APP.ADD_TOPIK_LEVEL} langFilter />
      </Grid>
      <Grid item xs={12}>
        <TopikLevelList />
      </Grid>
    </Grid>
  )
}
