import { CultureContext } from '../Context'
import { CultureContextProps } from 'Views/Culture/types'
import { Grid } from '@mui/material'
import { SectionHeading } from 'Components/Section'
import { useCultureConfig } from 'Views/Culture/Hooks'
import { CultureForm } from '../Organisms'

export default ({ type }: CultureContextProps) => {
  const { addTitle } = useCultureConfig(type)
  return (
    <CultureContext.Provider value={{ type }}>
      <Grid container rowSpacing={4}>
        <Grid item xs={12}>
          <SectionHeading title={addTitle} />
        </Grid>
        <Grid item xs={12}>
          <CultureForm />
        </Grid>
      </Grid>
    </CultureContext.Provider>
  )
}