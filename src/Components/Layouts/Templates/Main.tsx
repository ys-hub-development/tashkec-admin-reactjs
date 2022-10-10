import { Navigate, Outlet } from 'react-router-dom'
import { Content, Header, Sidebar } from 'Components/Layouts/Organisms'
import { useStore } from 'effector-react'
import { $AppStore } from 'Models'

type Props = {
  noWrapper?: boolean
}

export const MainLayout = ({ noWrapper }: Props) => {
  const { isAuthenticated } = useStore($AppStore)

  if (!isAuthenticated) {
    return <Navigate to='/sign-in' />
  }

  return (
    <>
      <Header />
      <Sidebar />
      <Content noWrapper={noWrapper}>
        <Outlet />
      </Content>
    </>
  )
}
