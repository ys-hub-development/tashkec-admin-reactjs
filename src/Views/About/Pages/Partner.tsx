import { Grid } from '@mui/material'
import { SectionHeading } from 'Components/Section'
import { APP } from 'Constants/App'
import { PartnerForm, PartnerList } from 'Views/About/Organisms'
import { useCallback } from 'react'
import { updateDialogEvent } from 'Models'

export default () => {
  const onAdd = useCallback(() => {
    updateDialogEvent({
      title: APP.ADD_PARTNER,
      open: true,
      content: <PartnerForm />,
      props: {
        fullWidth: true,
        maxWidth: 'sm',
      },
    })
  }, [])

  return (
    <Grid container rowSpacing={4}>
      <Grid item xs={12}>
        <SectionHeading
          addTitle={APP.ADD_HISTORY}
          onAdd={onAdd}
        />
      </Grid>
      <Grid item xs={12}>
        <PartnerList />
      </Grid>
    </Grid>
  )
}