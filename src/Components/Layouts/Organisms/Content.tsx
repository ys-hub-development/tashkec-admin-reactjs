import { FC, ReactNode } from 'react'
import { ContentWrapper, StyledContent } from '../Atoms'

type Props = {
  children: ReactNode
}

export const Content: FC<Props> = ({ children }) => {
  return (
    <StyledContent>
      <ContentWrapper>{children}</ContentWrapper>
    </StyledContent>
  )
}
