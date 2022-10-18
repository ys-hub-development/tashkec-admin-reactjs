import { useParams } from 'react-router-dom'
import { IParams } from 'Types/app'
import { useCallback } from 'react'
import { updateDialogEvent } from 'Models'
import { APP } from 'Constants/App'
import { Grid } from '@mui/material'
import { ContentWrapper } from 'Components/Layouts/Atoms'
import { SectionHeading } from 'Components/Section'
import { TopikLevelFileForm, TopikLevelFileList, TopikLevelForm } from 'Views/Materials/Organisms'

export default () => {
  const { topikLevelId } = useParams<IParams>()

  const onAdd = useCallback(() => {
    if (topikLevelId) {
      updateDialogEvent({
        title: APP.ADD_DOCUMENT,
        open: true,
        content: <TopikLevelFileForm id={topikLevelId} />,
        props: {
          fullWidth: true,
          maxWidth: 'sm',
        },
      })
    }
  }, [ topikLevelId ])

  return (
    <Grid container rowSpacing={4}>
      <Grid item xs={12}>
        <ContentWrapper>
          <Grid container rowSpacing={4}>
            <Grid item xs={12}>
              <SectionHeading title={APP.EDIT_TOPIK_LEVEL} />
            </Grid>
            <Grid item xs={12}>
              <TopikLevelForm />
            </Grid>
          </Grid>
        </ContentWrapper>
      </Grid>
      {topikLevelId && (
        <Grid item xs={12}>
          <ContentWrapper>
            <Grid container rowSpacing={4}>
              <Grid item xs={12}>
                <SectionHeading title={APP.FILES} onAdd={onAdd} addTitle={APP.ADD_FILE} />
              </Grid>
              <Grid item xs={12}>
                <TopikLevelFileList id={topikLevelId} />
              </Grid>
            </Grid>
          </ContentWrapper>
        </Grid>
      )}
    </Grid>
  )
}