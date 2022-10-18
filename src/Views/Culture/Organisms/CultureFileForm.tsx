import { Button, CircularProgress, Grid, Stack } from '@mui/material'
import { FormLangTab } from 'Components/Tabs'
import { InputUI } from 'Components/UI'
import { DocumentUpload } from 'Components/Upload'
import { APP } from 'Constants/App'
import { formLangTab } from 'Data/app'
import { updateDialogEvent } from 'Models'
import { Fragment } from 'react'
import { Controller } from 'react-hook-form'
import { useCultureFileForm } from '../Hooks'

type Props = {
  id: string
  detailId?: string
}

export const CultureFileForm = ({ id, detailId }: Props) => {
  const { form, isLoading, langError, onSubmit, disabled } = useCultureFileForm({
    initList: false,
    extraId: id,
    detailId,
  })
  const {
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = form

  return (
    <FormLangTab
      error={langError}
      render={lang => (
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container rowSpacing={3}>
            {formLangTab.map(({ id }) => {
              const titleName: any = `fileName${id}`
              return (
                <Fragment key={id}>
                  {lang === id && (
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
                  )}
                </Fragment>
              )
            })}
            <Grid item xs={12}>
              <DocumentUpload
                fileName={detailId ? watch('url') : watch('file')?.name || null}
                onChange={!detailId ? file => setValue('file', file) : undefined}
                error={errors.file?.message}
              />
            </Grid>
            <Grid item xs={12} marginTop={1}>
              <Stack direction='row' spacing={2} justifyContent='center'>
                <Button
                  size='large'
                  type='submit'
                  startIcon={isLoading && <CircularProgress size={20} color='inherit' />}
                  disabled={isLoading && disabled}>
                  {APP.SAVE}
                </Button>
                <Button className='light' size='large' onClick={() => updateDialogEvent(null)}>
                  {APP.CANCEL}
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </form>
      )}
    />
  )
}
