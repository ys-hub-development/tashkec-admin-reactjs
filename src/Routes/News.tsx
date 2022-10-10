import { MainLayout } from 'Components/Layouts'
import { SuspenseUI } from 'Components/UI'
import { CommonPath, NewsPath } from 'Constants/Navigation'
import { EventListPage, NewsListPage } from 'Views/News'
import EventAdd from 'Views/News/Pages/EventAdd'
import EventEdit from 'Views/News/Pages/EventEdit'
import NewsAdd from 'Views/News/Pages/NewsAdd'
import NewsEdit from 'Views/News/Pages/NewsEdit'
import StudyInKorea from 'Views/News/Pages/StudyInKorea'
import StudyInKoreaAdd from 'Views/News/Pages/StudyInKoreaAdd'
import StudyInKoreaEdit from 'Views/News/Pages/StudyInKoreaEdit'

export const newsRoutes = {
  path: '',
  children: [
    {
      path: `/${NewsPath.main}`,
      element: <MainLayout />,
      children: [
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
                  <NewsAdd />
                </SuspenseUI>
              ),
            },
            {
              path: `${CommonPath.edit}/:newsId`,
              element: (
                <SuspenseUI>
                  <NewsEdit />
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
                  <EventAdd />
                </SuspenseUI>
              ),
            },
            {
              path: `${CommonPath.edit}/:eventId`,
              element: (
                <SuspenseUI>
                  <EventEdit />
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
          path: NewsPath['study-in-korea'],
          children: [
            {
              path: '',
              element: (
                <SuspenseUI>
                  <StudyInKorea />
                </SuspenseUI>
              ),
            },
            {
              path: CommonPath.add,
              element: (
                <SuspenseUI>
                  <StudyInKoreaAdd />
                </SuspenseUI>
              ),
            },
          ],
        },
      ],
    },
    {
      path: `/${NewsPath.main}/${NewsPath['study-in-korea']}/${CommonPath.edit}/:studyId`,
      element: <MainLayout noWrapper />,
      children: [
        {
          path: '',
          element: (
            <SuspenseUI>
              <StudyInKoreaEdit />
            </SuspenseUI>
          ),
        },
      ],
    },
  ],
}
