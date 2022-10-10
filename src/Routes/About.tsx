import { MainLayout } from 'Components/Layouts'
import { SuspenseUI } from 'Components/UI'
import { SchedulerPath } from 'Constants/Navigation'
import {
  ContactInfoPage,
  GreetingPage,
  HistoryAddPage,
  HistoryPage,
  StructurePage,
  WorkPlanAddPage,
  WorkPlanEditPage,
  WorkPlanPage,
} from 'Views/About'
import { TimeTablePage } from 'Views/TimeTable'

export const aboutRoutes = {
  path: '',
  children: [
    {
      path: '/about',
      element: <MainLayout />,
      children: [
        {
          path: 'greeting',
          element: (
            <SuspenseUI>
              <GreetingPage />
            </SuspenseUI>
          ),
        },
        {
          path: 'structure',
          element: (
            <SuspenseUI>
              <StructurePage />
            </SuspenseUI>
          ),
        },
        {
          path: 'contacts',
          element: (
            <SuspenseUI>
              <ContactInfoPage />
            </SuspenseUI>
          ),
        },
        {
          path: 'history',
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
              path: 'add',
              element: (
                <SuspenseUI>
                  <HistoryAddPage />
                </SuspenseUI>
              ),
            },
            {
              path: 'edit/:historyId',
              element: (
                <SuspenseUI>
                  <HistoryAddPage />
                </SuspenseUI>
              ),
            },
          ],
        },
        {
          path: 'plan',
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
              path: 'add',
              element: (
                <SuspenseUI>
                  <WorkPlanAddPage />
                </SuspenseUI>
              ),
            },
            {
              path: 'edit/:planId',
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
