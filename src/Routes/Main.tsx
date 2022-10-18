import { MainLayout } from 'Components/Layouts'
import { SuspenseUI } from 'Components/UI'
import { BannerPage, PopupPage } from 'Views/Home'
import { MainPath } from 'Constants/Navigation'
import { Navigate } from 'react-router-dom'

export const mainRoutes = {
  path: '',
  children: [
    {
      path: `/${MainPath.main}`,
      element: <MainLayout />,
      children: [
        {
          path: '',
          element: <Navigate to={`/${MainPath.main}/${MainPath.banner}`} />
        },
        {
          path: MainPath.banner,
          element: <SuspenseUI><BannerPage /></SuspenseUI>,
        },
        {
          path: MainPath.popup,
          element: <SuspenseUI><PopupPage /></SuspenseUI>,
        },
      ],
    },
  ],
}
