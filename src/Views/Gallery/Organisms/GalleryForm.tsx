import { Button, CircularProgress, Grid, Stack } from '@mui/material'
import { FormLangTab } from 'Components/Tabs'
import { InputUI } from 'Components/UI'
import { APP } from 'Constants/App'
import { GalleryPath } from 'Constants/Navigation'
import { formLangTab } from 'Data/app'
import { Fragment } from 'react'
import { Controller } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { IParams } from 'Types/app'
import { useGalleryForm } from '../Hooks'
import { GalleryImageList } from './GalleryImageList'

export const GalleryForm = () => {
  const { galleryId } = useParams<IParams>()
  const navigate = useNavigate()

  const { form, onSubmit, disabled, isLoading, langError, files, onRemoveLocalFile, onChange, setMainImage } = useGalleryForm({
    detailId: galleryId,
    initList: false,
  })
  const { control, handleSubmit } = form

  return (
    <FormLangTab
      error={langError}
      render={lang => (
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={3}>
            {formLangTab.map(({ id }) => {
              const name: any = `title${id}`
              return (
                <Fragment key={id}>
                  {lang === id && (
                    <Grid item xs={9}>
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
            <Grid item xs={12}>
              <GalleryImageList
                handleMakeMainImage={setMainImage}
                files={files}
                onChange={onChange}
                onRemoveLocalFile={onRemoveLocalFile}
              />
            </Grid>
            <Grid item xs={12} marginTop={3}>
              <Stack direction='row' spacing={2}>
                <Button
                  size='large'
                  type='submit'
                  startIcon={isLoading && <CircularProgress size={20} color='inherit' />}
                  disabled={isLoading || disabled}>
                  {APP.SAVE}
                </Button>
                <Button className='light' size='large' onClick={() => navigate(`/${GalleryPath.main}`)}>
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
