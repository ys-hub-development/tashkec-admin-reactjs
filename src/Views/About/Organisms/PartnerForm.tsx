import { usePartnerForm } from 'Views/About/Hooks'
import { FormLangTab } from 'Components/Tabs'
import { Button, CircularProgress, Grid } from '@mui/material'
import { formLangTab } from 'Data/app'
import { Fragment, useCallback } from 'react'
import { Controller } from 'react-hook-form'
import { InputUI } from 'Components/UI'
import { APP } from 'Constants/App'
import { SimpleUpload } from 'Components/Upload'

type Props = {
  id?: string
}

export const PartnerForm = ({ id }: Props) => {
  const { form, onSubmit, langError, disabled, isLoading } = usePartnerForm({ initList: false, detailId: id })
  const { control, handleSubmit, setValue, setError, watch, formState: { errors } } = form

  const onUploadPhoto = useCallback((file: File | null) => {
    setValue('file', file)
    setError('file', {})
  }, [ setError, setValue ])

  const onRemovePhoto = useCallback(() => {
    setValue('file', null)
    setValue('imgUrl', null)
  }, [ setValue ])

  return (
    <FormLangTab error={langError} render={(lang) => (
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container rowSpacing={3}>
          {
            formLangTab.map(({ id }) => {
              const titleName: any = `title${id}`
              return (
                <Fragment key={id}>
                  {
                    lang === id && (
                      <Grid item xs={12}>
                        <Controller
                          name={titleName}
                          control={control}
                          render={({ field, fieldState: { error } }) => (
                            <InputUI
                              {...field}
                              label={`${APP.TITLE} (${id})`}
                              placeholder={APP.ENTER_TITLE}
                              error={!!error?.message}
                              helperText={error?.message}
                            />
                          )}
                        />
                      </Grid>
                    )
                  }
                </Fragment>
              )
            })
          }
          <Grid item xs={12}>
            <Controller
              name='webUrl'
              control={control}
              render={({ field, fieldState: { error } }) => (
                <InputUI
                  {...field}
                  label={APP.WEB_URL}
                  placeholder={APP.ENTER_LINK}
                  error={!!error?.message}
                  helperText={error?.message}
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name='youtubeUrl'
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
          {
            !id ? (
              <Grid item xs={12}>
                <SimpleUpload
                  url={watch('imgUrl')}
                  onRemove={onRemovePhoto}
                  onUpload={onUploadPhoto}
                  error={errors.file?.message}
                />
              </Grid>
            ) : null
          }
          <Grid item xs={12}>
            <Button
              startIcon={isLoading && <CircularProgress size={20} />}
              disabled={isLoading || disabled}
              type='submit'
              size='large'
              fullWidth
            >
              {APP.PUBLISH}
            </Button>
          </Grid>
        </Grid>
      </form>
    )} />
  )
}