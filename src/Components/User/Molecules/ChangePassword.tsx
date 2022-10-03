import { useChangePassword } from 'Components/User/Hooks'
import { Button, CircularProgress, Grid, Stack } from '@mui/material'
import { Controller } from 'react-hook-form'
import { InputUI } from 'Components/UI'
import { APP } from 'Constants/App'
import { updateDialogEvent } from 'Models'

export const ChangePassword = () => {
  const { form, onSubmit, disabled, isLoading } = useChangePassword()
  const { handleSubmit, control } = form

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container rowSpacing={3}>
        <Grid item xs={12}>
          <Controller
            name='currentPassword'
            control={control}
            render={({ field, fieldState: { error } }) => (
              <InputUI
                {...field}
                type='password'
                label={APP.OLD_PASSWORD}
                error={!!error?.message}
                helperText={error?.message}
                placeholder={APP.ENTER_OLD_PASSWORD}
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Controller
            name='newPassword'
            control={control}
            render={({ field, fieldState: { error } }) => (
              <InputUI
                {...field}
                type='password'
                label={APP.NEW_PASSWORD}
                error={!!error?.message}
                helperText={error?.message}
                placeholder={APP.ENTER_NEW_PASSWORD}
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Controller
            name='confirmPassword'
            control={control}
            render={({ field, fieldState: { error } }) => (
              <InputUI
                {...field}
                type='password'
                label={APP.CONFIRM_PASSWORD}
                error={!!error?.message}
                helperText={error?.message}
                placeholder={APP.REPEAT_PASSWORD}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} marginTop={1}>
          <Stack direction='row' spacing={2} justifyContent='center'>
            <Button
              size='large'
              type='submit'
              startIcon={isLoading && <CircularProgress size={20} color='inherit' />}
              disabled={isLoading && disabled}
            >
              {APP.SAVE}
            </Button>
            <Button className='light' size='large' onClick={() => updateDialogEvent(null)}>{APP.CANCEL}</Button>
          </Stack>
        </Grid>
      </Grid>
    </form>
  )
}