import { useNavigate, useParams } from 'react-router-dom'
import { IParams } from 'Types/app'
import { FormLangTab } from 'Components/Tabs'
import { Button, CircularProgress, Grid, Stack } from '@mui/material'
import { formLangTab } from 'Data/app'
import { Fragment, useContext } from 'react'
import { Controller } from 'react-hook-form'
import { InputUI, TextEditorUI } from 'Components/UI'
import { APP } from 'Constants/App'
import { CulturePath } from 'Constants/Navigation'
import { useCultureConfig, useCultureForm } from 'Views/Culture/Hooks'
import { CultureContext } from 'Views/Culture/Context'


export const CultureForm = () => {
  const { cultureId } = useParams<IParams>()
  const { type } = useContext(CultureContext)
  const { subPath } = useCultureConfig(type)
  const navigate = useNavigate()
  const { form, onSubmit, langError, disabled, isLoading } = useCultureForm({
    initList: false,
    detailId: cultureId,
  })
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
            <Grid item xs={12} marginTop={1}>
              <Stack direction='row' spacing={2}>
                <Button
                  size='large'
                  type='submit'
                  startIcon={isLoading && <CircularProgress size={20} color='inherit' />}
                  disabled={isLoading && disabled}>
                  {APP.SAVE}
                </Button>
                <Button
                  className='light' size='large'
                  onClick={() => navigate(`/${CulturePath.main}/${subPath}`)}
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