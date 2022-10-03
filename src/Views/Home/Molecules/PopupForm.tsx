import { usePopupForm } from 'Views/Home/Hooks'
import { Button, CircularProgress, Grid, Stack } from '@mui/material'
import { APP } from 'Constants/App'
import { Controller } from 'react-hook-form'
import { InputUI } from 'Components/UI'
import { SimpleUpload } from 'Components/Upload'
import { useCallback } from 'react'
import { updateDialogEvent } from 'Models'

type Props = {
  id?: string
}
export const PopupForm = ({ id }: Props) => {
  const {
    onSubmit,
    form,
    disabled,
    isLoading,
    onChangeIsImage,
  } = usePopupForm({ initList: false, detailId: id })
  const { handleSubmit, watch, control, setValue, setError, formState: { errors } } = form

  const isImage = watch('isImage')

  const onUploadPhoto = useCallback((file: File | null) => {
    setValue('file', file)
    setError('file', {})
  }, [ setError, setValue ])

  const onRemovePhoto = useCallback(() => {
    setValue('file', null)
    setValue('imgUrl', null)
  }, [ setValue ])

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container rowSpacing={3}>
        {
          !id && (
            <Grid item xs={12}>
              <Stack direction='row'>
                <Button onClick={() => onChangeIsImage(true)} variant={isImage ? 'contained' : 'text'}>
                  {APP.PHOTO}
                </Button>
                <Button onClick={() => onChangeIsImage(false)} variant={!isImage ? 'contained' : 'text'}>
                  {APP.VIDEO}
                </Button>
              </Stack>
            </Grid>
          )
        }

        {
          isImage ?
            (
              <>
                {
                  !id && (
                    <Grid item xs={12}>
                      <SimpleUpload
                        url={watch('imgUrl')}
                        onRemove={onRemovePhoto}
                        onUpload={onUploadPhoto}
                        error={errors.file?.message}
                      />
                    </Grid>
                  )
                }

                <Grid item xs={12}>
                  <Controller
                    name='redirectUrl'
                    control={control}
                    render={({ field }) => (
                      <InputUI {...field} label={APP.LINK} placeholder={APP.ENTER_LINK} />
                    )}
                  />
                </Grid>
              </>
            )
            : (
              <Grid item xs={12}>
                <Controller
                  name='videoUrl'
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <InputUI
                      {...field}
                      label={APP.VIDEO_URL}
                      placeholder={APP.ENTER_LINK}
                      error={!!error?.message}
                      helperText={error?.message}
                    />
                  )}
                />
              </Grid>
            )
        }
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