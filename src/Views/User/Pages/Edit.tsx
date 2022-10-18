import { Grid } from '@mui/material'
import { SectionHeading } from 'Components/Section'
import { useParams } from 'react-router-dom'
import { IParams } from 'Types/app'
import { UserForm } from 'Components/User'

export default () => {
  const { userId } = useParams<IParams>()
  return (
    <Grid container rowSpacing={4}>
      <Grid item xs={12}>
        <SectionHeading />
      </Grid>
      <Grid item xs={12}>
        <UserForm type='user' userId={userId} />
      </Grid>
    </Grid>
  )
}