import { MainLayout } from 'Components/Layouts'
import { SuspenseUI } from 'Components/UI'
import { Navigate } from 'react-router-dom'

export const baseRoutes = {
  path: '',
  children: [
    {
      path: '/',
      element: <MainLayout />,
      children: [
        {
          path: '/',
          element: <Navigate to='/main/banner' />,
        },
      ],
    },
    {
      path: '404',
      element: <MainLayout />,
      children: [
        {
          path: '',
          element: (
            <SuspenseUI>
              404
            </SuspenseUI>
          ),
        },
      ],
    },
    {
      path: '*',
      element: <Navigate to='/404' />,
    },
  ],
}