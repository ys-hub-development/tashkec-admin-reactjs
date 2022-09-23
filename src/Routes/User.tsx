import { MainLayout } from 'Components/Layouts'
import { SuspenseUI } from 'Components/UI'
import UserListPage from 'Views/User/Pages/List'

export const userRoutes = {
  path: '',
  children: [
    {
      path: '/users',
      element: <MainLayout />,
      children: [
        {
          path: '',
          element: <SuspenseUI><UserListPage /></SuspenseUI>,
        },
      ],
    },
  ],
}
