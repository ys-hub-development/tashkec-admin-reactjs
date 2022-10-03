import { MainLayout } from 'Components/Layouts'
import { SuspenseUI } from 'Components/UI'
import { ProfileSettingsPage } from 'Views/Settings'
import { Navigate } from 'react-router-dom'
import { SettingsPath } from 'Constants/Navigation'

export const settingsRoutes = {
  path: '',
  children: [
    {
      path: '/profile',
      element: <MainLayout />,
      children: [
        {
          path: '',
          element: <Navigate to={`/${SettingsPath.profile}/${SettingsPath.settings}`} />,
        },
        {
          path: 'settings',
          element: <SuspenseUI><ProfileSettingsPage /></SuspenseUI>,
        },
      ],
    },
  ],
}
