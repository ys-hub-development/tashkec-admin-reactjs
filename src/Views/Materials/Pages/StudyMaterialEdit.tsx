import { useParams } from 'react-router-dom'
import { IParams } from 'Types/app'
import { useCallback } from 'react'
import { updateDialogEvent } from 'Models'
import { APP } from 'Constants/App'
import { Grid } from '@mui/material'
import { ContentWrapper } from 'Components/Layouts/Atoms'
import { SectionHeading } from 'Components/Section'
import { UniversityFileList, UniversityForm } from 'Views/University/Organisms'
import { StudyMaterialFileForm } from 'Views/Materials/Organisms'


export default () => {
  const { studyMaterialId } = useParams<IParams>()

  const onAdd = useCallback(() => {
    if (studyMaterialId) {
      updateDialogEvent({
        title: APP.ADD_DOCUMENT,
        open: true,
        content: <StudyMaterialFileForm id={studyMaterialId} />,
        props: {
          fullWidth: true,
          maxWidth: 'sm',
        },
      })
    }
  }, [ studyMaterialId ])

  return (
    <Grid container rowSpacing={4}>
      <Grid item xs={12}>
        <ContentWrapper>
          <Grid container rowSpacing={4}>
            <Grid item xs={12}>
              <SectionHeading title={APP.EDIT_STUDY_MATERIAL} />
            </Grid>
            <Grid item xs={12}>
              <UniversityForm />
            </Grid>
          </Grid>
        </ContentWrapper>
      </Grid>
      {studyMaterialId && (
        <Grid item xs={12}>
          <ContentWrapper>
            <Grid container rowSpacing={4}>
              <Grid item xs={12}>
                <SectionHeading title={APP.FILES} onAdd={onAdd} addTitle={APP.ADD_FILE} />
              </Grid>
              <Grid item xs={12}>
                <UniversityFileList id={studyMaterialId} />
              </Grid>
            </Grid>
          </ContentWrapper>
        </Grid>
      )}
    </Grid>
  )
}