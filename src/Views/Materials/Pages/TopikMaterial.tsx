import { useCallback } from 'react'
import { Grid } from '@mui/material'
import { SectionHeading } from 'Components/Section'
import { APP } from 'Constants/App'
import { TopikMaterialForm, TopikMaterialList } from 'Views/Materials/Organisms'
import { updateDialogEvent } from 'Models'

export default () => {
  const onAdd = useCallback(() => {
    updateDialogEvent({
      title: APP.ADD_TOPIK_MATERIAL,
      content: <TopikMaterialForm />,
      open: true,
      props: {
        fullWidth: true,
        maxWidth: 'sm',
      },
    })
  }, [])

  return (
    <Grid container rowSpacing={4}>
      <Grid item xs={12}>
        <SectionHeading onAdd={onAdd} addTitle={APP.ADD_TOPIK_MATERIAL} langFilter />
      </Grid>
      <Grid item xs={12}>
        <TopikMaterialList />
      </Grid>
    </Grid>
  )
}
