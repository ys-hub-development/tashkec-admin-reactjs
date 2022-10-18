import { FC, ReactNode, useContext } from 'react'
import { ContentWrapper, StyledContent } from '../Atoms'
import { MainLayoutContext } from 'Components/Layouts/Context'

type Props = {
  children: ReactNode
}

export const Content: FC<Props> = ({ children }) => {
  const { noWrapper } = useContext(MainLayoutContext)
  return (
    <StyledContent>{noWrapper ? children : <ContentWrapper>{children}</ContentWrapper>}</StyledContent>
  )
}
