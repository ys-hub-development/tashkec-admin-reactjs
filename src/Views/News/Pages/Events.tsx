import { Grid } from '@mui/material'
import { SectionHeading } from 'Components/Section'
import { APP } from 'Constants/App'
import { CommonPath, NewsPath } from 'Constants/Navigation'
import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { EventsList } from '../Organisms'

export default () => {
  const navigate = useNavigate()

  const onAdd = useCallback(() => {
    navigate(`/${NewsPath.main}/${NewsPath['center-events']}/${CommonPath.add}`)
  }, [navigate])

  return (
    <Grid container rowSpacing={4}>
      <Grid item xs={12}>
        <SectionHeading onAdd={onAdd} addTitle={APP.ADD_EVENT} langFilter />
      </Grid>
      <Grid item xs={12}>
        <EventsList />
      </Grid>
    </Grid>
  )
}
