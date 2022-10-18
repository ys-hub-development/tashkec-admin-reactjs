import { useParams } from 'react-router-dom'
import { IParams } from 'Types/app'
import { useCallback } from 'react'
import { updateDialogEvent } from 'Models'
import { APP } from 'Constants/App'
import { Grid } from '@mui/material'
import { ContentWrapper } from 'Components/Layouts/Atoms'
import { SectionHeading } from 'Components/Section'
import { InstitutionContext } from '../Context'
import { EducationTypeEnum } from 'Entities/institution'
import { useInstitutionConfig } from 'Views/University/Hooks'
import { UniversityFileForm, UniversityFileList, UniversityForm } from 'Views/University/Organisms'

type Props = {
  type: EducationTypeEnum
}

export default ({ type }: Props) => {
  const { institutionId } = useParams<IParams>()
  const { editTitle } = useInstitutionConfig(type)

  const onAdd = useCallback(() => {
    if (institutionId) {
      updateDialogEvent({
        title: APP.ADD_DOCUMENT,
        open: true,
        content: <UniversityFileForm id={institutionId} />,
        props: {
          fullWidth: true,
          maxWidth: 'sm',
        },
      })
    }
  }, [ institutionId ])

  return (
    <InstitutionContext.Provider value={{ type }}>
      <Grid container rowSpacing={4}>
        <Grid item xs={12}>
          <ContentWrapper>
            <Grid container rowSpacing={4}>
              <Grid item xs={12}>
                <SectionHeading title={editTitle} />
              </Grid>
              <Grid item xs={12}>
                <UniversityForm />
              </Grid>
            </Grid>
          </ContentWrapper>
        </Grid>
        {institutionId && (
          <Grid item xs={12}>
            <ContentWrapper>
              <Grid container rowSpacing={4}>
                <Grid item xs={12}>
                  <SectionHeading title={APP.FILES} onAdd={onAdd} addTitle={APP.ADD_FILE} />
                </Grid>
                <Grid item xs={12}>
                  <UniversityFileList id={institutionId} />
                </Grid>
              </Grid>
            </ContentWrapper>
          </Grid>
        )}
      </Grid>
    </InstitutionContext.Provider>
  )
}