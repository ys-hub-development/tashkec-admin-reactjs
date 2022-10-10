import { Grid } from '@mui/material'
import { SectionHeading } from 'Components/SectionHeading'
import { UniversityForm } from 'Views/University/Organisms'
import { EducationTypeEnum } from 'Entities/institution'
import { InstitutionContext } from '../Context'
import { useInstitutionConfig } from 'Views/University/Hooks'

type Props = {
  type: EducationTypeEnum
}

export default ({ type }: Props) => {
  const { addTitle } = useInstitutionConfig(type)
  return (
    <InstitutionContext.Provider value={{ type }}>
      <Grid container rowSpacing={4}>
        <Grid item xs={12}>
          <SectionHeading title={addTitle} />
        </Grid>
        <Grid item xs={12}>
          <UniversityForm />
        </Grid>
      </Grid>
    </InstitutionContext.Provider>
  )
}