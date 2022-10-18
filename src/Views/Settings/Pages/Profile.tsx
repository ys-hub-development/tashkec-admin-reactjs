import { Grid } from '@mui/material'
import { SectionHeading } from 'Components/Section'
import { useStore } from 'effector-react'
import { $Account } from 'Models'
import { UserForm } from 'Components/User'

const Profile = () => {
  const account = useStore($Account)
  return (
    <Grid container spacing={4}>
      <Grid item xs={12}>
        <SectionHeading />
      </Grid>
      {
        account?.id && (
          <Grid item xs={12}>
            <UserForm type='account' userId={String(account.id)} />
          </Grid>
        )
      }
    </Grid>
  )
}

export default Profile