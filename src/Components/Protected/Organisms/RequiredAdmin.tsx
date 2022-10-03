import { ReactNode } from 'react'
import { UserRoleEnum } from 'Entities/account'
import { Navigate } from 'react-router-dom'
import { useStore } from 'effector-react'
import { $Account } from 'Models'

type Props = {
  children: ReactNode
}

export const RequiredAdmin = ({ children }: Props) => {
  const data = useStore($Account)

  if (data?.authorities && data.authorities.indexOf(UserRoleEnum.ROLE_ADMIN) !== -1) {
    return <Navigate to='/' />
  }

  return (
    <>{children}</>
  )
}