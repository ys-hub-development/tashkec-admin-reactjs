import { FormLangTab } from 'Components/Tabs'
import { Button, CircularProgress, Grid, Stack } from '@mui/material'
import { useCenterHistoryForm } from 'Views/About/Hooks'
import { useNavigate, useParams } from 'react-router-dom'
import { IParams } from 'Types/app'
import { formLangTab } from 'Data/app'
import { Fragment } from 'react'
import { InputUI } from 'Components/UI'
import { Controller } from 'react-hook-form'
import { APP } from 'Constants/App'
import { AboutPath } from 'Constants/Navigation'

export const HistoryForm = () => {
  const navigate = useNavigate()
  const { historyId } = useParams<IParams>()
  const { form, onSubmit, disabled, isLoading, langError } = useCenterHistoryForm({
    detailId: historyId,
    initList: false,
  })
  const { control, handleSubmit } = form

  return (
    <FormLangTab
      error={langError}
      render={(lang) => (
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container rowSpacing={3}>
            {
              formLangTab.map(({ id }) => {
                const name: any = `title${id}`
                return (
                  <Fragment key={id}>
                    {
                      lang === id && (
                        <Grid item xs={12}>
                          <Controller
                            name={name}
                            control={control}
                            render={({ field, fieldState: { error } }) => (
                              <InputUI
                                {...field}
                                label={`${APP.TEXT} (${id})`}
                                placeholder={APP.ENTER_TEXT}
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

            <Grid item xs={3}>
              <Controller
                name='publishedDate'
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <InputUI
                    {...field}
                    label={APP.DATE_TIME}
                    type='datetime-local'
                    error={!!error?.message}
                    helperText={error?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} marginTop={1}>
              <Stack direction='row' spacing={2}>
                <Button
                  size='large'
                  type='submit'
                  startIcon={isLoading && <CircularProgress size={20} color='inherit' />}
                  disabled={isLoading && disabled}
                >
                  {APP.SAVE}
                </Button>
                <Button
                  className='light'
                  size='large'
                  onClick={() => navigate(`/${AboutPath.main}/${AboutPath.history}`)}
                >
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