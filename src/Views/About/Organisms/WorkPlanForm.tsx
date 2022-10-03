import { useWorkPlanForm } from 'Views/About/Hooks'
import { FormLangTab } from 'Components/Tabs'
import { Button, CircularProgress, Grid, Stack, Typography } from '@mui/material'
import { formLangTab } from 'Data/app'
import { Fragment } from 'react'
import { Controller } from 'react-hook-form'
import { InputUI, TextEditorUI } from 'Components/UI'
import { APP } from 'Constants/App'
import { WorkPlanTypeEnum } from 'Entities/about'
import { AboutPath } from 'Constants/Navigation'
import { useNavigate, useParams } from 'react-router-dom'
import { IParams } from 'Types/app'

export const WorkPlanForm = () => {
  const {planId} = useParams<IParams>()
  const navigate = useNavigate()
  const { form, onSubmit, langError, disabled, isLoading } = useWorkPlanForm({initList: false, detailId: planId})
  const { control, setValue, handleSubmit, setError, watch } = form
  const planType = watch('workPlanTypeEnum')

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
            <Typography variant='subtitle2' marginBottom={1}>{APP.PLAN}</Typography>
            <Stack direction='row' spacing={2}>
              <Button
                variant={planType === WorkPlanTypeEnum.MONTH ? 'contained' : 'text'}
                onClick={() => setValue('workPlanTypeEnum', WorkPlanTypeEnum.MONTH)}
              >
                {APP.FOR_MONTH}
              </Button>
              <Button
                variant={planType === WorkPlanTypeEnum.YEAR ? 'contained' : 'text'}
                onClick={() => setValue('workPlanTypeEnum', WorkPlanTypeEnum.YEAR)}
              >
                {APP.FOR_YEAR}
              </Button>
            </Stack>
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
                onClick={() => navigate(`/${AboutPath.main}/${AboutPath.plan}`)}
              >
                {APP.CANCEL}
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </form>
    )} />
  )
}