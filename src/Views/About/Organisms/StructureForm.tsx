import { useCenterStructureForm } from 'Views/About/Hooks'
import { Controller } from 'react-hook-form'
import { Fragment } from 'react'
import { InputUI, TextEditorUI } from 'Components/UI'
import { formLangTab } from 'Data/app'
import { Button, CircularProgress, Grid } from '@mui/material'
import { APP } from 'Constants/App'
import { FormLangTab } from 'Components/Tabs'

export const StructureForm = () => {
  const { form, onSubmit, langError, disabled, isLoading } = useCenterStructureForm()
  const { control, setValue, handleSubmit, setError } = form

  return (
    <FormLangTab error={langError} render={(lang) => (
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container rowSpacing={3}>
          {
            formLangTab.map(({ id }) => {
              const titleName: any = `title${id}`
              const contentName: any = `content${id}`
              return (
                <Fragment key={id}>
                  {
                    lang === id && (
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
                                onChange={(value) => {
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
                    )
                  }
                </Fragment>
              )
            })
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