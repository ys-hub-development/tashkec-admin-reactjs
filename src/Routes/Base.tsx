import { MainLayout } from 'Components/Layouts'
import { SuspenseUI } from 'Components/UI'
import { Navigate } from 'react-router-dom'
import { UIKitPage } from 'Views/UIKit'

export const baseRoutes = {
  path: '',
  children: [
    {
      path: '/',
      element: <MainLayout />,
      children: [
        {
          path: '',
          element: <Navigate to='/uikit' />,
        },
      ],
    },
    {
      path: 'uikit',
      element: <MainLayout />,
      children: [
        {
          path: '',
          element: (
            <SuspenseUI>
              <UIKitPage />
            </SuspenseUI>
          ),
        },
      ],
    },
    {
      path: '404',
      element: <MainLayout />,
      children: [
        {
          path: '',
          element: <SuspenseUI>404</SuspenseUI>,
        },
      ],
    },
    {
      path: '*',
      element: <Navigate to='/404' />,
    },
  ],
}
