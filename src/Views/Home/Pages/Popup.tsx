import { Grid } from '@mui/material'
import { SectionHeading } from 'Components/Section'
import { AdvertisingList } from 'Views/Home/Organisms'
import { useCallback } from 'react'
import { APP } from 'Constants/App'
import { updateDialogEvent } from 'Models'
import { PopupForm } from 'Views/Home/Molecules'

export default () => {

  const onAdd = useCallback(() => {
    updateDialogEvent({
      title: APP.ADD_POPUP,
      open: true,
      content: <PopupForm />,
      props: {
        fullWidth: true,
        maxWidth: 'sm',
      },
    })
  }, [])

  return (
    <Grid container spacing={4}>
      <Grid item xs={12}>
        <SectionHeading onAdd={onAdd} addTitle={APP.ADD_POPUP} />
      </Grid>
      <Grid item xs={12}>
        <AdvertisingList />
      </Grid>
    </Grid>
  )
}