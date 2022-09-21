import { AuthForm } from '../Atoms'
import { useLoginForm } from '../Hooks'
import { Button, Grid, Typography } from '@mui/material'
import { Controller } from 'react-hook-form'
import { InputUI } from 'Components/UI/FormElemnts'

export const LoginForm = () => {
  const { form, onSubmit } = useLoginForm()
  const { control, handleSubmit } = form

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
          <Button fullWidth type='submit' size='large'>Войти в систему</Button>
        </Grid>
      </Grid>
    </AuthForm>
  )
}