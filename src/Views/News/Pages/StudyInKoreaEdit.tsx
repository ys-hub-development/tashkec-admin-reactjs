import { Grid } from '@mui/material'
import { ContentWrapper } from 'Components/Layouts/Atoms'
import { SectionHeading } from 'Components/SectionHeading'
import { APP } from 'Constants/App'
import { updateDialogEvent } from 'Models'
import { useCallback } from 'react'
import { useParams } from 'react-router-dom'
import { IParams } from 'Types/app'
import { StudyInKoreaFileForm, StudyInKoreaFilesList, StudyInKoreaForm } from '../Organisms'

export default () => {
  const { studyId } = useParams<IParams>()

  const onAdd = useCallback(() => {
    if (studyId) {
      updateDialogEvent({
        title: APP.ADD_DOCUMENT,
        open: true,
        content: <StudyInKoreaFileForm id={studyId} />,
        props: {
          fullWidth: true,
          maxWidth: 'sm',
        },
      })
    }
  }, [studyId])

  return (
    <Grid container rowSpacing={4}>
      <Grid item xs={12}>
        <ContentWrapper>
          <Grid container rowSpacing={4}>
            <Grid item xs={12}>
              <SectionHeading title={APP.EDIT_STUDY_IN_KOREA} />
            </Grid>
            <Grid item xs={12}>
              <StudyInKoreaForm />
            </Grid>
          </Grid>
        </ContentWrapper>
      </Grid>
      {studyId && (
        <Grid item xs={12}>
          <ContentWrapper>
            <Grid container rowSpacing={4}>
              <Grid item xs={12}>
                <SectionHeading title={APP.FILES} onAdd={onAdd} addTitle={APP.ADD_FILE} />
              </Grid>
              <Grid item xs={12}>
                <StudyInKoreaFilesList id={studyId} />
              </Grid>
            </Grid>
          </ContentWrapper>
        </Grid>
      )}
    </Grid>
  )
}
