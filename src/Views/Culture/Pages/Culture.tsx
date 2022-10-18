import { CultureContextProps } from 'Views/Culture/types'
import { CultureContext } from '../Context'
import { Grid } from '@mui/material'
import { SectionHeading } from 'Components/Section'
import { useCallback } from 'react'
import { CommonPath, CulturePath } from 'Constants/Navigation'
import { useNavigate } from 'react-router-dom'
import { useCultureConfig } from 'Views/Culture/Hooks'
import { CultureList } from '../Organisms'

export default ({ type }: CultureContextProps) => {
  const navigate = useNavigate()
  const { subPath, addTitle } = useCultureConfig(type)

  const onAdd = useCallback(() => {
    navigate(`/${CulturePath.main}/${subPath}/${CommonPath.add}`)
  }, [navigate, subPath])

  return (
    <CultureContext.Provider value={{ type }}>
      <Grid container rowSpacing={4}>
        <Grid item xs={12}>
          <SectionHeading onAdd={onAdd} addTitle={addTitle} langFilter />
        </Grid>
        <Grid item xs={12}>
          <CultureList />
        </Grid>
      </Grid>
    </CultureContext.Provider>
  )
}
