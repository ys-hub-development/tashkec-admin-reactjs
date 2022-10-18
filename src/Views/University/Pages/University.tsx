import { useNavigate } from 'react-router-dom'
import { useCallback } from 'react'
import { CommonPath, InstitutionPath } from 'Constants/Navigation'
import { Grid } from '@mui/material'
import { SectionHeading } from 'Components/Section'
import { UniversityList } from 'Views/University/Organisms'
import { EducationTypeEnum } from 'Entities/institution'
import { InstitutionContext } from 'Views/University/Context'
import { useInstitutionConfig } from 'Views/University/Hooks'

type Props = {
  type: EducationTypeEnum
}

export default ({ type }: Props) => {
  const navigate = useNavigate()
  const { subPath, addTitle } = useInstitutionConfig(type)

  const onAdd = useCallback(() => {
    navigate(`/${InstitutionPath.main}/${subPath}/${CommonPath.add}`)
  }, [navigate, subPath])

  return (
    <InstitutionContext.Provider value={{ type }}>
      <Grid container rowSpacing={4}>
        <Grid item xs={12}>
          <SectionHeading onAdd={onAdd} addTitle={addTitle} langFilter />
        </Grid>
        <Grid item xs={12}>
          <UniversityList />
        </Grid>
      </Grid>
    </InstitutionContext.Provider>
  )
}
