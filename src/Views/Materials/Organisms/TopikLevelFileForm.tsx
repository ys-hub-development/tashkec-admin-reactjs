import { Button, CircularProgress, Grid, Stack } from '@mui/material'
import { FormLangTab } from 'Components/Tabs'
import { InputUI } from 'Components/UI'
import { DocumentUpload } from 'Components/Upload'
import { APP } from 'Constants/App'
import { formLangTab } from 'Data/app'
import { updateDialogEvent } from 'Models'
import { Fragment, useMemo } from 'react'
import { Controller } from 'react-hook-form'
import { useTopikLevelFileForm } from 'Views/Materials/Hooks'
import { AutocompleteUI } from 'Components/UI/FormElemnts/Autocomplete'
import { IAutoCompleteOption } from 'Types/app'
import { FileTypeEnum } from 'Entities/attachment'

type Props = {
  id: string
  detailId?: string
}

export const TopikLevelFileForm = ({ id, detailId }: Props) => {
  const { form, isLoading, langError, onSubmit, disabled } = useTopikLevelFileForm({
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

  const options = useMemo((): IAutoCompleteOption[] => [
    { label: FileTypeEnum.ZIP, value: FileTypeEnum.ZIP },
    { label: FileTypeEnum.PDF, value: FileTypeEnum.PDF },
    { label: FileTypeEnum.MP3, value: FileTypeEnum.MP3 },
  ], [])

  const fileType = watch('type')?.value

  const fileAccept = useMemo(():string => {
    switch (fileType) {
      case FileTypeEnum.ZIP:
        return 'application/zip,application/x-rar'
      case FileTypeEnum.PDF:
        return 'application/pdf'
      case FileTypeEnum.MP3:
        return 'audio/mpeg'
      default:
        return 'application/pdf'
    }
  }, [fileType])

  return (
    <FormLangTab
      error={langError}
      render={lang => (
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container rowSpacing={3}>
            <Grid item xs={5}>
              <Controller
                name='type'
                control={control}
                render={({ field: { value }, fieldState: { error } }) => (
                  <AutocompleteUI
                    label={APP.FILE_TYPE}
                    value={value}
                    options={options}
                    onChange={(value) => setValue('type', value)}
                    placeholder={APP.SELECT_FILE_TYPE}
                    error={error?.message}
                  />
                )}
              />
            </Grid>
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
                accept={fileAccept}
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
