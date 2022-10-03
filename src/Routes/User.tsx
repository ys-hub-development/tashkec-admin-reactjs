import { MainLayout } from 'Components/Layouts'
import { SuspenseUI } from 'Components/UI'
import { CommonPath, PathParams, UserPath } from 'Constants/Navigation'
import { UserAddPage, UserEditPage, UsersPage } from 'Views/User'

export const userRoutes = {
  path: '',
  children: [
    {
      path: `/${UserPath.main}`,
      element: <MainLayout />,
      children: [
        {
          path: '',
          element: <SuspenseUI><UsersPage /></SuspenseUI>,
        },
        {
          path: CommonPath.add,
          element: <SuspenseUI><UserAddPage /></SuspenseUI>,
        },
        {
          path: `${CommonPath.edit}/:${PathParams.userId}`,
          element: <SuspenseUI><UserEditPage /></SuspenseUI>,
        },
      ],
    },
  ],
}
