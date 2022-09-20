import { Navigate, Outlet } from 'react-router-dom'
import { Content, Header, Sidebar } from 'Components/Layouts/Organisms'
import { useStore } from 'effector-react'
import { $AppStore } from 'Models'

export const MainLayout = () => {
  const { isAuthenticated } = useStore($AppStore)

  if (!isAuthenticated) {
    return <Navigate to='/sign-in' />
  }

  return (
    <>
      <Header />
      <Sidebar />
      <Content>
        <Outlet />
      </Content>
    </>
  )
}
