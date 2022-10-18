import { Grid } from '@mui/material'
import { SectionHeading } from 'Components/Section'
import { APP } from 'Constants/App'
import { CommonPath, StudyPath } from 'Constants/Navigation'
import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { StudyInKoreaList } from '../Organisms'
import { StudyTypeEnum } from 'Entities/news'
import { useStudyInKoreaConfig } from 'Views/StudyInKorea/Hooks'
import { StudyInKoreaContext } from '../Context'

type Props = {
  type: StudyTypeEnum
}

export default ({ type }: Props) => {
  const { subPath } = useStudyInKoreaConfig(type)
  const navigate = useNavigate()

  const onAdd = useCallback(() => {
    navigate(`/${StudyPath.main}/${subPath}/${CommonPath.add}`)
  }, [navigate, subPath])

  return (
    <StudyInKoreaContext.Provider value={{ type }}>
      <Grid container rowSpacing={4}>
        <Grid item xs={12}>
          <SectionHeading onAdd={onAdd} addTitle={APP.ADD_NEWS} langFilter />
        </Grid>
        <Grid item xs={12}>
          <StudyInKoreaList />
        </Grid>
      </Grid>
    </StudyInKoreaContext.Provider>
  )
}
