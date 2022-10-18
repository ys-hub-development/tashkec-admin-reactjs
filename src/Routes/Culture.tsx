import { CommonPath, CulturePath } from 'Constants/Navigation'
import { MainLayout } from 'Components/Layouts'
import { Navigate } from 'react-router-dom'
import { SuspenseUI } from 'Components/UI'
import { CultureAddPage, CultureEditPage, CulturePage } from 'Views/Culture'
import { KoreanCultureType } from 'Entities/culture'

export const cultureRoutes = {
  path: '',
  children: [
    {
      path: `/${CulturePath.main}`,
      element: <MainLayout />,
      children: [
        {
          path: '',
          element: <Navigate to={`/${CulturePath.main}/${CulturePath['creative-mugs']}`} />,
        },
        {
          path: CulturePath['creative-mugs'],
          children: [
            {
              path: '',
              element: (
                <SuspenseUI>
                  <CulturePage type={KoreanCultureType.ADDITIONAL_LESSON} />
                </SuspenseUI>
              ),
            },
            {
              path: CommonPath.add,
              element: (
                <SuspenseUI>
                  <CultureAddPage type={KoreanCultureType.ADDITIONAL_LESSON} />
                </SuspenseUI>
              ),
            },
          ],
        },
        {
          path: CulturePath['culture-of-korea'],
          children: [
            {
              path: '',
              element: (
                <SuspenseUI>
                  <CulturePage type={KoreanCultureType.INTRODUCE_KOREAN_CULTURE} />
                </SuspenseUI>
              ),
            },
            {
              path: CommonPath.add,
              element: (
                <SuspenseUI>
                  <CultureAddPage type={KoreanCultureType.INTRODUCE_KOREAN_CULTURE} />
                </SuspenseUI>
              ),
            },
          ],
        },
      ],
    },
    {
      path: `/${CulturePath.main}/${CulturePath['creative-mugs']}/edit/:cultureId`,
      element: <MainLayout noWrapper />,
      children: [
        {
          path: '',
          element: (
            <SuspenseUI>
              <CultureEditPage type={KoreanCultureType.ADDITIONAL_LESSON} />
            </SuspenseUI>
          )
        }
      ]
    },
    {
      path: `/${CulturePath.main}/${CulturePath['culture-of-korea']}/edit/:cultureId`,
      element: <MainLayout noWrapper />,
      children: [
        {
          path: '',
          element: (
            <SuspenseUI>
              <CultureEditPage type={KoreanCultureType.INTRODUCE_KOREAN_CULTURE} />
            </SuspenseUI>
          )
        }
      ]
    }
  ],
}