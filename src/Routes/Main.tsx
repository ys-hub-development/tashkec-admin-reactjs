import { MainLayout } from '../Components/Layouts'
import { SuspenseUI } from '../Components/UI'

export const mainRoutes = {
  path: '',
  children: [
    {
      path: '/main',
      element: <MainLayout />,
      children: [
        {
          path: 'banner',
          element: <SuspenseUI>banner</SuspenseUI>,
        },
        {
          path: 'logo',
          element: <SuspenseUI>logo</SuspenseUI>,
        },
      ],
    },
  ],
}
