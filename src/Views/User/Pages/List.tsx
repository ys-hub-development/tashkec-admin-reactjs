import { Grid } from '@mui/material'
import { SectionHeading } from 'Components/Section'
import { useCallback } from 'react'
import { UserList } from 'Views/User/Organisms'
import { useNavigate } from 'react-router-dom'
import { CommonPath, UserPath } from 'Constants/Navigation'
import { APP } from 'Constants/App'

export default () => {
  const navigate = useNavigate()

  const onAdd = useCallback(() => {
    navigate(`/${UserPath.main}/${CommonPath.add}`)
  }, [navigate])

  return (
    <Grid container rowSpacing={4}>
      <Grid item xs={12}>
        <SectionHeading onAdd={onAdd} addTitle={APP.ADD_USER} />
      </Grid>
      <Grid item xs={12}>
        <UserList />
      </Grid>
    </Grid>
  )
}
