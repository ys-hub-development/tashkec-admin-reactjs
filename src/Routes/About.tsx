import { MainLayout } from 'Components/Layouts'
import { SuspenseUI } from 'Components/UI'
import { GreetingPage, HistoryPage, StructurePage } from 'Views/About'

export const aboutRoutes = {
  path: '',
  children: [
    {
      path: '/about',
      element: <MainLayout />,
      children: [
        {
          path: 'greeting',
          element: <SuspenseUI><GreetingPage /></SuspenseUI>,
        },
        {
          path: 'structure',
          element: <SuspenseUI><StructurePage /></SuspenseUI>,
        },
        {
          path: 'history',
          element: <SuspenseUI><HistoryPage /></SuspenseUI>,
        },
      ],
    },
  ],
}
