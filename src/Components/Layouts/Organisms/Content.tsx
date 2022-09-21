import { FC, ReactNode } from 'react'
import { ContentWrapper, StyledContent } from '../Atoms'
import { Grid, Typography } from '@mui/material'
import { useLayoutHeading } from 'Hooks'

type Props = {
  children: ReactNode
}

export const Content: FC<Props> = ({ children }) => {
  const { contentHeading } = useLayoutHeading()

  return (
    <StyledContent>
      <ContentWrapper>
        <Grid container rowSpacing={6}>
          <Grid item xs={12}>
            <Typography variant='h4'>{contentHeading}</Typography>
          </Grid>
          <Grid item xs={12}>
            {children}
          </Grid>
        </Grid>
      </ContentWrapper>
    </StyledContent>
  )
}
