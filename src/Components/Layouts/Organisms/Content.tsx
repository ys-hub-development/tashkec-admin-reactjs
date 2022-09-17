import { FC, ReactNode } from 'react'

type Props = {
  children: ReactNode
}

export const Content: FC<Props> = ({ children }) => {
  return (
    <div>
      {children}
    </div>
  )
}