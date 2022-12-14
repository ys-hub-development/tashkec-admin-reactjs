import { Button, CircularProgress, Grid, Stack } from '@mui/material'
import { FormLangTab } from 'Components/Tabs'
import { InputUI, TextEditorUI } from 'Components/UI'
import { APP } from 'Constants/App'
import { NewsPath } from 'Constants/Navigation'
import { formLangTab } from 'Data/app'
import { Fragment } from 'react'
import { Controller } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { IParams } from 'Types/app'
import { useNewsForm } from 'Views/News/Hooks'

export const NewsForm = () => {
  const { newsId } = useParams<IParams>()
  const navigate = useNavigate()
  const { form, onSubmit, langError, disabled, isLoading } = useNewsForm({ initList: false, detailId: newsId })
  const { control, setValue, handleSubmit, setError } = form

  return (
    <FormLangTab
      error={langError}
      render={lang => (
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container rowSpacing={3}>
            {formLangTab.map(({ id }) => {
              const titleName: any = `title${id}`
              const contentName: any = `content${id}`
              return (
                <Fragment key={id}>
                  {lang === id && (
                    <>
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
                      <Grid item xs={12}>
                        <Controller
                          name={contentName}
                          control={control}
                          render={({ field: { value }, fieldState: { error } }) => (
                            <TextEditorUI
                              label={`${APP.TEXT} (${id})`}
                              value={value}
                              errorText={error?.message}
                              onChange={value => {
                                if (value.length > 0) {
                                  setError(contentName, {})
                                }
                                setValue(contentName, value)
                              }}
                            />
                          )}
                        />
                      </Grid>
                    </>
                  )}
                </Fragment>
              )
            })}
            <Grid item xs={3}>
              <Controller
                name='publishedDate'
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <InputUI {...field} label={APP.DATE_TIME} type='datetime-local' error={!!error?.message} helperText={error?.message} />
                )}
              />
            </Grid>
            <Grid item xs={12} marginTop={1}>
              <Stack direction='row' spacing={2}>
                <Button
                  size='large'
                  type='submit'
                  startIcon={isLoading && <CircularProgress size={20} color='inherit' />}
                  disabled={isLoading && disabled}>
                  {APP.SAVE}
                </Button>
                <Button className='light' size='large' onClick={() => navigate(`/${NewsPath.main}/${NewsPath['center-news']}`)}>
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
