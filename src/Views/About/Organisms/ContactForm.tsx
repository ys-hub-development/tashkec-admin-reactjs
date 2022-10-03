import { FormLangTab } from 'Components/Tabs'
import { Button, CircularProgress, Grid } from '@mui/material'
import { formLangTab } from 'Data/app'
import { Fragment } from 'react'
import { Controller } from 'react-hook-form'
import { InputUI, TextEditorUI } from 'Components/UI'
import { APP } from 'Constants/App'
import { useContactForm } from 'Views/About/Hooks'

export const ContactForm = () => {
  const { form, onSubmit, langError, disabled, isLoading } = useContactForm()
  const { control, setValue, handleSubmit, setError } = form

  return (
    <FormLangTab error={langError} render={(lang) => (
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
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
          <Grid item xs={6}>
            <Controller
              name='phoneNumber'
              control={control}
              render={({ field, fieldState: { error } }) => (
                <InputUI
                  {...field}
                  type='tel'
                  label={APP.PHONE}
                  error={!!error?.message}
                  helperText={error?.message}
                  placeholder={APP.ENTER_PHONE}
                />
              )}
            />
          </Grid>
          <Grid item xs={6}>
            <Controller
              name='contactEmail'
              control={control}
              render={({ field, fieldState: { error } }) => (
                <InputUI
                  {...field}
                  type='email'
                  label={APP.EMAIL}
                  error={!!error?.message}
                  helperText={error?.message}
                  placeholder={APP.ENTER_EMAIL}
                />
              )}
            />
          </Grid>
          {
            formLangTab.map(({ id }) => {
              const contentName: any = `content${id}`
              return (
                <Fragment key={id}>
                  {
                    lang === id && (
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