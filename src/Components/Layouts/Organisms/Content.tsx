import { FC, ReactNode } from 'react'
import { ContentWrapper, StyledContent } from '../Atoms'

type Props = {
  children: ReactNode
  noWrapper?: boolean
}

export const Content: FC<Props> = ({ children, noWrapper }) => {
  return <StyledContent>{noWrapper ? children : <ContentWrapper>{children}</ContentWrapper>}</StyledContent>
}
