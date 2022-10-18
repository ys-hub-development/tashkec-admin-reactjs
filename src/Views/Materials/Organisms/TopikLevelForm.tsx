import { FormLangTab } from 'Components/Tabs'
import { useTopikLevelForm } from 'Views/Materials/Hooks'
import { Button, CircularProgress, Grid, Stack } from '@mui/material'
import { formLangTab } from 'Data/app'
import { Fragment, useMemo } from 'react'
import { Controller } from 'react-hook-form'
import { InputUI } from 'Components/UI'
import { APP } from 'Constants/App'
import { useNavigate, useParams } from 'react-router-dom'
import { MaterialPath, MaterialPathTitle } from 'Constants/Navigation'
import { AutocompleteUI } from 'Components/UI/FormElemnts/Autocomplete'
import { IAutoCompleteOption, IParams } from 'Types/app'
import { useTopikMaterialInfinite } from 'Hooks'

export const TopikLevelForm = () => {
  const { topikLevelId } = useParams<IParams>()
  const { list } = useTopikMaterialInfinite(true)
  const navigate = useNavigate()
  const { disabled, onSubmit, isLoading, form, langError } = useTopikLevelForm({
    initList: false,
    detailId: topikLevelId,
  })
  const { handleSubmit, control, setValue } = form

  const options = useMemo((): IAutoCompleteOption[] => {
    return list.map(item => ({ label: item.titleRu, value: item.id }))
  }, [ list ])

  return (
    <FormLangTab
      error={langError}
      render={lang => (
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <Controller
                name='materialsOfTopic'
                control={control}
                render={({ field: { value }, fieldState: { error } }) => (
                  <AutocompleteUI
                    label={MaterialPathTitle['topik-materials']}
                    value={value}
                    options={options}
                    onChange={(value) => setValue('materialsOfTopic', value)}
                    placeholder={APP.SELCET_TOPIK_MATERIAL}
                    error={error?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={6}>
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
                  onClick={() => navigate(`/${MaterialPath.main}/${MaterialPath['topik-levels']}`)}
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