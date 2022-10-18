import { FormLangTab } from 'Components/Tabs'
import { useTopikMaterialForm } from 'Views/Materials/Hooks'
import { Button, CircularProgress, Grid, Stack } from '@mui/material'
import { APP } from 'Constants/App'
import { updateDialogEvent } from 'Models'
import { formLangTab } from 'Data/app'
import { Fragment } from 'react'
import { Controller } from 'react-hook-form'
import { InputUI } from 'Components/UI'

type Props = {
  id?: string
}

export const TopikMaterialForm = ({ id }: Props) => {
  const { form, langError, disabled, onSubmit, isLoading } = useTopikMaterialForm({ initList: false, detailId: id })
  const { handleSubmit, control } = form

  return (
    <FormLangTab
      error={langError}
      render={lang => (
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container rowSpacing={3}>
            <Grid item xs={12} marginTop={1}>
              {formLangTab.map(({ id }) => {
                const titleName: any = `title${id}`
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
            </Grid>
            <Grid item xs={12}>
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