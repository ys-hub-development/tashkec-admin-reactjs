import { MainLayout } from 'Components/Layouts'
import { SuspenseUI } from 'Components/UI'
import { CommonPath, NewsPath } from 'Constants/Navigation'
import { EventAddPage, EventEditPage, EventListPage, NewsAddPage, NewsEditPage, NewsListPage } from 'Views/News'
import { Navigate } from 'react-router-dom'

export const newsRoutes = {
  path: '',
  children: [
    {
      path: `/${NewsPath.main}`,
      element: <MainLayout />,
      children: [
        {
          path: '',
          element: <Navigate to={`/${NewsPath.main}/${NewsPath['center-news']}`} />,
        },
        {
          path: NewsPath['center-news'],
          children: [
            {
              path: '',
              element: (
                <SuspenseUI>
                  <NewsListPage />
                </SuspenseUI>
              ),
            },
            {
              path: CommonPath.add,
              element: (
                <SuspenseUI>
                  <NewsAddPage />
                </SuspenseUI>
              ),
            },
            {
              path: `${CommonPath.edit}/:newsId`,
              element: (
                <SuspenseUI>
                  <NewsEditPage />
                </SuspenseUI>
              ),
            },
          ],
        },
      ],
    },
    {
      path: `/${NewsPath.main}`,
      element: <MainLayout />,
      children: [
        {
          path: NewsPath['center-events'],
          children: [
            {
              path: '',
              element: (
                <SuspenseUI>
                  <EventListPage />
                </SuspenseUI>
              ),
            },
            {
              path: CommonPath.add,
              element: (
                <SuspenseUI>
                  <EventAddPage />
                </SuspenseUI>
              ),
            },
            {
              path: `${CommonPath.edit}/:eventId`,
              element: (
                <SuspenseUI>
                  <EventEditPage />
                </SuspenseUI>
              ),
            },
          ],
        },
      ],
    },
  ],
}
