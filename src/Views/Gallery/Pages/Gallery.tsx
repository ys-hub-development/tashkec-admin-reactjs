import { Grid } from '@mui/material'
import { SectionHeading } from 'Components/Section'
import { APP } from 'Constants/App'
import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { CommonPath, GalleryPath } from 'Constants/Navigation'
import { GalleryList } from 'Views/Gallery/Organisms'

export default () => {
  const navigate = useNavigate()
  const onAdd = useCallback(() => {
    navigate(`/${GalleryPath.main}/${CommonPath.add}`)
  }, [ navigate ])

  return (
    <Grid container rowSpacing={4}>
      <Grid item xs={12}>
        <SectionHeading onAdd={onAdd} addTitle={APP.ADD_GALLERY} />
      </Grid>
      <Grid item xs={12}>
        <GalleryList />
      </Grid>
    </Grid>
  )
}