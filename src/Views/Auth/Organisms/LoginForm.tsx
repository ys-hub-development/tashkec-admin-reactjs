import { AuthForm } from '../Atoms'
import { useLoginForm } from '../Hooks'
import { Button, CircularProgress, Grid, Typography } from '@mui/material'
import { Controller } from 'react-hook-form'
import { InputUI } from 'Components/UI/FormElemnts'
import { APP } from 'Constants/App'

export const LoginForm = () => {
  const { form, onSubmit, mutation } = useLoginForm()
  const { control, handleSubmit, formState: { errors } } = form

  return (
    <AuthForm onSubmit={handleSubmit(onSubmit)}>
      <Grid container rowSpacing={4}>
        <Grid item xs={12}>
          <Typography variant='h1' marginBottom={1}>Добро пожаловать</Typography>
          <Typography variant='body2'>Войдите в свой аккаунт</Typography>
        </Grid>
        <Grid item xs={12}>
          <Controller
            name='username'
            control={control}
            render={({ field, fieldState: { error } }) => (
              <InputUI
                {...field}
                label='Имя пользователья'
                placeholder='Введите имя пользователья'
                error={!!error?.message}
                helperText={error?.message}
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Controller
            name='password'
            control={control}
            render={({ field, fieldState: { error } }) => (
              <InputUI
                {...field}
                type='password'
                placeholder='Введите пароль'
                label='Пароль'
                error={!!error?.message}
                helperText={error?.message}
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            size='large'
            fullWidth type='submit'
            startIcon={mutation.isLoading && <CircularProgress size={20} />}
            disabled={mutation.isLoading || !!errors.password?.message || !!errors.username?.message}
          >
            {APP.ENTER_TO_SYSTEM}
          </Button>
        </Grid>
      </Grid>
    </AuthForm>
  )
}