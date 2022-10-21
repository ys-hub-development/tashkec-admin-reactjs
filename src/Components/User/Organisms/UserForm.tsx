import { Button, CircularProgress, FormControlLabel, Grid, Link, Stack, Switch } from '@mui/material'
import { InputUI } from 'Components/UI'
import { APP } from 'Constants/App'
import { Controller } from 'react-hook-form'
import InputMask from 'react-input-mask'
import { SimpleUpload } from 'Components/Upload'
import { useUserForm } from 'Components/User/Hooks'
import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserPath } from 'Constants/Navigation'
import { updateDialogEvent } from 'Models'
import { ChangePassword } from 'Components/User/Molecules'

type Props = {
  userId?: string
  type: 'account' | 'user'
}

export const UserForm = ({ userId, type }: Props) => {
  const navigate = useNavigate()
  const { form, onSubmit, onUploadPhoto, onRemovePhoto, isLoading, disabled } = useUserForm({
    detailId: userId,
    initList: false,
    type,
  })
  const { control, handleSubmit, setValue, watch } = form

  const onCancel = useCallback(() => {
    if (type === 'user') {
      navigate(`/${UserPath.main}`)
    } else {
      navigate('/')
    }
  }, [navigate, type])

  const onClickChangePassword = useCallback(() => {
    updateDialogEvent({
      open: true,
      title: APP.CHANGE_PASSWORD,
      content: <ChangePassword userId={userId} />,
      props: {
        fullWidth: true,
        maxWidth: 'xs',
      },
    })
  }, [userId])

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container rowSpacing={3}>
        <Grid item xs={12}>
          <SimpleUpload onUpload={onUploadPhoto} onRemove={onRemovePhoto} url={watch('logoUrl')} />
        </Grid>
        <Grid item xs={12}>
          <Controller
            name='firstName'
            control={control}
            render={({ field, fieldState: { error } }) => (
              <InputUI
                required
                {...field}
                label={APP.FIRST_NAME}
                error={!!error?.message}
                helperText={error?.message}
                placeholder={APP.ENTER_FIRST_NAME}
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Controller
            name='lastName'
            control={control}
            render={({ field, fieldState: { error } }) => (
              <InputUI
                required
                {...field}
                label={APP.LAST_NAME}
                error={!!error?.message}
                helperText={error?.message}
                placeholder={APP.ENTER_LAST_NAME}
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Controller
            name='login'
            control={control}
            render={({ field, fieldState: { error } }) => (
              <InputUI
                required
                {...field}
                disabled={!!userId}
                label={APP.USERNAME}
                error={!!error?.message}
                helperText={error?.message}
                placeholder={APP.ENTER_USERNAME}
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Controller
            name='email'
            control={control}
            render={({ field, fieldState: { error } }) => (
              <InputUI
                {...field}
                label={APP.EMAIL}
                helperText={error?.message}
                placeholder={APP.ENTER_EMAIL}
                required
                error={!!error?.message}
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Controller
            name='phoneNumber'
            control={control}
            render={({ field, fieldState: { error } }) => {
              const { value, onChange, onBlur } = field
              return (
                <InputMask value={value || ''} alwaysShowMask mask={'+\\9\\9\\8 99 999 99 99'} onChange={onChange} onBlur={onBlur}>
                  <InputUI type='tel' required label={APP.PHONE} error={!!error?.message} helperText={error?.message} />
                </InputMask>
              )
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <Controller
            name='password'
            control={control}
            render={({ field, fieldState: { error } }) => (
              <InputUI
                required
                {...field}
                type='password'
                label={APP.PASSWORD}
                error={!!error?.message}
                helperText={error?.message}
                placeholder={APP.ENTER_PASSWORD}
                endAdornment={
                  userId ? (
                    <Link sx={{ cursor: 'pointer' }} onClick={onClickChangePassword}>
                      {APP.CHANGE_PASSWORD}
                    </Link>
                  ) : undefined
                }
              />
            )}
          />
        </Grid>
        {type === 'user' && (
          <Grid item xs={12}>
            <Stack direction='row'>
              <Controller
                name='activated'
                control={control}
                render={({ field: { value } }) => (
                  <FormControlLabel
                    label={APP.ACTIVATED_USER}
                    control={<Switch checked={value} size='small' />}
                    onChange={(event, checked) => setValue('activated', checked)}
                  />
                )}
              />
              <Controller
                name='superUser'
                control={control}
                render={({ field: { value } }) => (
                  <FormControlLabel
                    label={APP.ADMIN}
                    control={<Switch checked={value} size='small' />}
                    onChange={(event, checked) => setValue('superUser', checked)}
                  />
                )}
              />
            </Stack>
          </Grid>
        )}
        <Grid item xs={12} marginTop={1}>
          <Stack direction='row' spacing={2}>
            <Button
              size='large'
              type='submit'
              startIcon={isLoading && <CircularProgress size={20} color='inherit' />}
              disabled={isLoading && disabled}>
              {APP.SAVE}
            </Button>
            <Button className='light' size='large' onClick={onCancel}>
              {APP.CANCEL}
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </form>
  )
}
