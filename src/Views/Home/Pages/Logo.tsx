import { APP } from 'Constants/App'
import { Button, CircularProgress, Grid } from '@mui/material'
import { useMainPicture } from 'Views/Home/Hooks'
import { PictureContext } from 'Views/Home/Context'
import { LogoList } from 'Views/Home/Organisms'
import { SectionHeading } from 'Components/Section'
import { useCallback } from 'react'

export default () => {
  const hook = useMainPicture({ type: 'logo' })
  const { files, onSave, isCreateIsLoading } = hook

  const onAdd = useCallback(() => {
    console.log(1)
  }, [])

  return (
    <PictureContext.Provider value={{ ...hook }}>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <SectionHeading addTitle={APP.ADD_PARTNER} onAdd={onAdd} />
        </Grid>
        <Grid item xs={12}>
          <LogoList />
        </Grid>
        <Grid item xs={12}>
          <Button
            fullWidth
            size='large'
            onClick={onSave}
            disabled={files.length === 0 || isCreateIsLoading}
            startIcon={isCreateIsLoading && <CircularProgress size={20} color='inherit' />}
          >
            {APP.PUBLISH}
          </Button>
        </Grid>
      </Grid>
    </PictureContext.Provider>
  )
}

