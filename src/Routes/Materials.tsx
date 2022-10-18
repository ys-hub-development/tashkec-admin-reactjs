import { MainLayout } from 'Components/Layouts'
import { CommonPath, MaterialPath } from 'Constants/Navigation'
import { SuspenseUI } from 'Components/UI'
import {
  StudyMaterialAddPage,
  StudyMaterialEditPage,
  StudyMaterialPage,
  TopikLevelAddPage,
  TopikLevelEditPage,
  TopikLevelPage,
  TopikMaterialPage,
} from 'Views/Materials'
import { Navigate } from 'react-router-dom'

export const materialRoutes = {
  path: '',
  children: [
    {
      path: `/${MaterialPath.main}`,
      element: <MainLayout />,
      children: [
        {
          path:'',
          element: <Navigate to={`/${MaterialPath.main}/${MaterialPath['topik-materials']}`} />
        },
        {
          path: MaterialPath['topik-levels'],
          children: [
            {
              path: '',
              element: (
                <SuspenseUI>
                  <TopikLevelPage />
                </SuspenseUI>
              ),
            },
            {
              path: CommonPath.add,
              element: (
                <SuspenseUI>
                  <TopikLevelAddPage />
                </SuspenseUI>
              ),
            },
          ],
        },
        {
          path: MaterialPath['topik-materials'],
          children: [
            {
              path: '',
              element: (
                <SuspenseUI>
                  <TopikMaterialPage />
                </SuspenseUI>
              ),
            },
          ],
        },
        {
          path: MaterialPath['study-material'],
          children: [
            {
              path: '',
              element: (
                <SuspenseUI>
                  <StudyMaterialPage />
                </SuspenseUI>
              ),
            },
            {
              path: CommonPath.add,
              element: (
                <SuspenseUI>
                  <StudyMaterialAddPage />
                </SuspenseUI>
              ),
            },
          ],
        },
      ],
    },
    {
      path: `/${MaterialPath.main}/${MaterialPath['study-material']}/${CommonPath.edit}/:studyMaterialId`,
      element: <MainLayout noWrapper />,
      children: [
        {
          path: '',
          element: (
            <SuspenseUI>
              <StudyMaterialEditPage />
            </SuspenseUI>
          ),
        },
      ],
    },
    {
      path: `/${MaterialPath.main}/${MaterialPath['topik-levels']}/${CommonPath.edit}/:topikLevelId`,
      element: <MainLayout noWrapper />,
      children: [
        {
          path: '',
          element: (
            <SuspenseUI>
              <TopikLevelEditPage />
            </SuspenseUI>
          ),
        },
      ],
    },
  ],
}
