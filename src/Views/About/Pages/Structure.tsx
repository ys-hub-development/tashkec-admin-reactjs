import { StructureForm } from 'Views/About/Organisms'
import { SectionHeading } from 'Components/SectionHeading'
import { Grid } from '@mui/material'

const StructurePage = () => {
  return (
    <Grid container rowSpacing={4}>
      <Grid item xs={12}>
        <SectionHeading />
      </Grid>
      <Grid item xs={12}>
        <StructureForm />
      </Grid>
    </Grid>
  )
}


export default StructurePage