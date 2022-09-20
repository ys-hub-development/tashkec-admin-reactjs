import { Grid } from '@mui/material'
import { ButtonKit, InputKit } from '../Organisms'

const UIKit = () => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <ButtonKit />
      </Grid>
      <Grid item xs={12}>
        <InputKit />
      </Grid>
    </Grid>
  )
}

export default UIKit
