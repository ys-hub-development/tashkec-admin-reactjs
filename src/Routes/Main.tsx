import { MainLayout } from 'Components/Layouts'
import { SuspenseUI } from 'Components/UI'
import { BannerPage, LogoPage } from 'Views/Home'

export const mainRoutes = {
  path: '',
  children: [
    {
      path: '/main',
      element: <MainLayout />,
      children: [
        {
          path: 'banner',
          element: <SuspenseUI><BannerPage /></SuspenseUI>,
        },
        {
          path: 'logo',
          element: <SuspenseUI><LogoPage /></SuspenseUI>,
        },
      ],
    },
  ],
}
