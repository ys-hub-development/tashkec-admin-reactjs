import { CultureContext } from '../Context'
import { CultureContextProps } from '../types'
import { useParams } from 'react-router-dom'
import { IParams } from 'Types/app'
import { useCallback } from 'react'
import { APP } from 'Constants/App'
import { Grid } from '@mui/material'
import { useCultureConfig } from 'Views/Culture/Hooks'
import { updateDialogEvent } from 'Models'
import { ContentWrapper } from 'Components/Layouts'
import { SectionHeading } from 'Components/Section'
import { CultureFileForm, CultureFileList, CultureForm } from '../Organisms'

export default ({ type }: CultureContextProps) => {
  const { cultureId } = useParams<IParams>()
  const { editTitle } = useCultureConfig(type)

  const onAdd = useCallback(() => {
    if (cultureId) {
      updateDialogEvent({
        title: APP.ADD_DOCUMENT,
        open: true,
        content: <CultureFileForm id={cultureId} />,
        props: {
          fullWidth: true,
          maxWidth: 'sm',
        },
      })
    }
  }, [ cultureId ])

  return (
    <CultureContext.Provider value={{ type }}>
      <Grid container rowSpacing={4}>
        <Grid item xs={12}>
          <ContentWrapper>
            <Grid container rowSpacing={4}>
              <Grid item xs={12}>
                <SectionHeading title={editTitle} />
              </Grid>
              <Grid item xs={12}>
                <CultureForm />
              </Grid>
            </Grid>
          </ContentWrapper>
        </Grid>
        {cultureId && (
          <Grid item xs={12}>
            <ContentWrapper>
              <Grid container rowSpacing={4}>
                <Grid item xs={12}>
                  <SectionHeading title={APP.FILES} onAdd={onAdd} addTitle={APP.ADD_FILE} />
                </Grid>
                <Grid item xs={12}>
                  <CultureFileList id={cultureId} />
                </Grid>
              </Grid>
            </ContentWrapper>
          </Grid>
        )}
      </Grid>
    </CultureContext.Provider>
  )
}