import { ReactNode, Suspense } from 'react'
import { StyleWrapper } from 'Components/UI/Suspense/style'
import { Preloader } from 'Components/UI/Preloader'

type Props = {
  children?: ReactNode
}

export const SuspenseUI = ({ children }: Props) => {
  return <Suspense fallback={<StyleWrapper><Preloader /></StyleWrapper>}>{children}</Suspense>
}
