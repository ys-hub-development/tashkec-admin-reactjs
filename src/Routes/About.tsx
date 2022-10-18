import { MainLayout } from 'Components/Layouts'
import { SuspenseUI } from 'Components/UI'
import {
  ContactInfoPage,
  GreetingPage,
  HistoryAddPage,
  HistoryPage,
  PartnerPage,
  StructurePage,
  WorkPlanAddPage,
  WorkPlanEditPage,
  WorkPlanPage,
} from 'Views/About'
import { AboutPath, CommonPath } from 'Constants/Navigation'
import { Navigate } from 'react-router-dom'

export const aboutRoutes = {
  path: '',
  children: [
    {
      path: `/${AboutPath.main}`,
      element: <MainLayout />,
      children: [
        {
          path: '',
          element: <Navigate to={`/${AboutPath.main}/${AboutPath.greeting}`} />,
        },
        {
          path: AboutPath.greeting,
          element: (
            <SuspenseUI>
              <GreetingPage />
            </SuspenseUI>
          ),
        },
        {
          path: AboutPath.partners,
          element: (
            <SuspenseUI>
              <PartnerPage />
            </SuspenseUI>
          ),
        },
        {
          path: AboutPath.structure,
          element: (
            <SuspenseUI>
              <StructurePage />
            </SuspenseUI>
          ),
        },
        {
          path: AboutPath.address,
          element: (
            <SuspenseUI>
              <ContactInfoPage />
            </SuspenseUI>
          ),
        },
        {
          path: AboutPath.history,
          children: [
            {
              path: '',
              element: (
                <SuspenseUI>
                  <HistoryPage />
                </SuspenseUI>
              ),
            },
            {
              path: CommonPath.add,
              element: (
                <SuspenseUI>
                  <HistoryAddPage />
                </SuspenseUI>
              ),
            },
            {
              path: `${CommonPath.edit}/:historyId`,
              element: (
                <SuspenseUI>
                  <HistoryAddPage />
                </SuspenseUI>
              ),
            },
          ],
        },
        {
          path: AboutPath.plan,
          children: [
            {
              path: '',
              element: (
                <SuspenseUI>
                  <WorkPlanPage />
                </SuspenseUI>
              ),
            },
            {
              path: CommonPath.add,
              element: (
                <SuspenseUI>
                  <WorkPlanAddPage />
                </SuspenseUI>
              ),
            },
            {
              path: `${CommonPath.edit}/:planId`,
              element: (
                <SuspenseUI>
                  <WorkPlanEditPage />
                </SuspenseUI>
              ),
            },
          ],
        },
      ],
    },
  ],
}
