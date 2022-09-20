import { Grid, Typography } from '@mui/material'
import { InputUI } from 'Components/UI/FormElemnts'

export const InputKit = () => {
  return (

    <Grid container spacing={4}>
      <Grid item xs={12}>
        <Typography variant='h3' marginBottom={2}>
          Form Elements
        </Typography>
        <Grid container spacing={2}>
          <Grid item lg={2}>
            <InputUI label='Name' placeholder='test' required error helperText='test' />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}