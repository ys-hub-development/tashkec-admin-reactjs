import { Button, CircularProgress, Grid, Stack } from '@mui/material'
import { APP } from 'Constants/App'
import { Controller } from 'react-hook-form'
import { useBannerUpdateForm } from 'Views/Home/Hooks'
import { InputUI } from 'Components/UI'
import { updateDialogEvent } from 'Models'

type Props = {
  id: number
}

export const BannerForm = ({ id }: Props) => {
  const { isLoading, form, disabled, onSubmit } = useBannerUpdateForm({ detailId: String(id), initList: false })
  const { control, handleSubmit } = form
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container rowSpacing={3}>
        <Grid item xs={12}>
          <Controller
            name='name'
            control={control}
            render={({ field, fieldState: { error } }) => (
              <InputUI
                {...field}
                label={APP.TITLE}
                error={!!error?.message}
                helperText={error?.message}
                placeholder={APP.ENTER_TITLE}
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Controller
            name='sliderUrl'
            control={control}
            render={({ field, fieldState: { error } }) => (
              <InputUI
                {...field}
                label={APP.LINK}
                error={!!error?.message}
                helperText={error?.message}
                placeholder={APP.ENTER_LINK}
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