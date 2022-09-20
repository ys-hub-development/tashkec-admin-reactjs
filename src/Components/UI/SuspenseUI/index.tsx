import { ReactNode, Suspense } from 'react'

type Props = {
  children?: ReactNode
}

export const SuspenseUI = ({ children }: Props) => {
  return <Suspense fallback={<>...loading</>}>{children}</Suspense>
}
