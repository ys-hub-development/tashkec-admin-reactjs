import { Grid } from '@mui/material'
import { SectionHeading } from 'Components/SectionHeading'
import { useCallback } from 'react'
import { UserList } from 'Views/User/Organisms'

const UserListPage = () => {

  const onAdd = useCallback(() => {
    console.log('add')
  }, [])

  return (
    <Grid container rowSpacing={4}>
      <Grid item xs={12}>
        <SectionHeading onAdd={onAdd} />
      </Grid>
      <Grid item xs={12}>
        <UserList />
      </Grid>
    </Grid>
  )
}

export default UserListPage