import { Navigate, Outlet } from 'react-router-dom'
import { Content, Header, Sidebar } from 'Components/Layouts/Organisms'
import { useStore } from 'effector-react'
import { $AppStore } from 'Models'
import { MainLayoutContext } from 'Components/Layouts/Context'
import { MainLayoutContextProps } from 'Components/Layouts/types'

type Props = MainLayoutContextProps

export const MainLayout = (props : Props) => {
  const { isAuthenticated } = useStore($AppStore)

  if (!isAuthenticated) {
    return <Navigate to='/sign-in' />
  }

  return (
    <MainLayoutContext.Provider value={props}>
      <Header />
      <Sidebar />
      <Content>
        <Outlet />
      </Content>
    </MainLayoutContext.Provider>
  )
}
