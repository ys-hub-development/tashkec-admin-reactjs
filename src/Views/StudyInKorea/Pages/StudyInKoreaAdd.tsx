import { Grid } from '@mui/material'
import { SectionHeading } from 'Components/Section'
import { APP } from 'Constants/App'
import { StudyInKoreaForm } from '../Organisms'
import { StudyTypeEnum } from 'Entities/news'
import { StudyInKoreaContext } from '../Context'

type Props = {
  type: StudyTypeEnum
}

export default ({type}:Props) => {
  return (
    <StudyInKoreaContext.Provider value={{ type }}>
      <Grid container rowSpacing={4}>
        <Grid item xs={12}>
          <SectionHeading title={APP.ADD_STUDY_IN_KOREA} />
        </Grid>
        <Grid item xs={12}>
          <StudyInKoreaForm />
        </Grid>
      </Grid>
    </StudyInKoreaContext.Provider>
  )
}
