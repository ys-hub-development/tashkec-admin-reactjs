import { CommonPath, StudyPath } from 'Constants/Navigation'
import { MainLayout } from 'Components/Layouts'
import { SuspenseUI } from 'Components/UI'
import { StudyInKoreaAddPage, StudyInKoreaEditPage, StudyInKoreaPage } from 'Views/StudyInKorea'
import { StudyTypeEnum } from 'Entities/news'
import { Navigate } from 'react-router-dom'

export const studyRoutes = {
  path: '',
  children: [
    {
      path: `/${StudyPath.main}`,
      element: <MainLayout />,
      children: [
        {
          path: '',
          element: <Navigate to={`/${StudyPath.main}/${StudyPath['program-of-gks']}`} />
        },
        {
          path: StudyPath['program-of-gks'],
          children: [
            {
              path: '',
              element: (
                <SuspenseUI>
                  <StudyInKoreaPage type={StudyTypeEnum.PROGRAM_OF_GKS} />
                </SuspenseUI>
              ),
            },
            {
              path: CommonPath.add,
              element: (
                <SuspenseUI>
                  <StudyInKoreaAddPage type={StudyTypeEnum.PROGRAM_OF_GKS} />
                </SuspenseUI>
              ),
            },
          ],
        },
        {
          path: StudyPath['association-gks'],
          children: [
            {
              path: '',
              element: (
                <SuspenseUI>
                  <StudyInKoreaPage type={StudyTypeEnum.ASSOCIATION_GKS} />
                </SuspenseUI>
              ),
            },
            {
              path: CommonPath.add,
              element: (
                <SuspenseUI>
                  <StudyInKoreaAddPage type={StudyTypeEnum.ASSOCIATION_GKS} />
                </SuspenseUI>
              ),
            },
          ],
        },
        {
          path: StudyPath['news-of-study'],
          children: [
            {
              path: '',
              element: (
                <SuspenseUI>
                  <StudyInKoreaPage type={StudyTypeEnum.NEWS_OF_STUDY} />
                </SuspenseUI>
              ),
            },
            {
              path: CommonPath.add,
              element: (
                <SuspenseUI>
                  <StudyInKoreaAddPage type={StudyTypeEnum.NEWS_OF_STUDY} />
                </SuspenseUI>
              ),
            },
          ],
        },
        {
          path: StudyPath['program-for-kor'],
          children: [
            {
              path: '',
              element: (
                <SuspenseUI>
                  <StudyInKoreaPage type={StudyTypeEnum.PROGRAM_FOR_KOR} />
                </SuspenseUI>
              ),
            },
            {
              path: CommonPath.add,
              element: (
                <SuspenseUI>
                  <StudyInKoreaAddPage type={StudyTypeEnum.PROGRAM_FOR_KOR} />
                </SuspenseUI>
              ),
            },
          ],
        },
      ],
    },
    {
      path: `/${StudyPath.main}/${StudyPath['program-of-gks']}/${CommonPath.edit}/:studyId`,
      element: <MainLayout noWrapper />,
      children: [
        {
          path: '',
          element: (
            <SuspenseUI>
              <StudyInKoreaEditPage type={StudyTypeEnum.PROGRAM_OF_GKS} />
            </SuspenseUI>
          ),
        },
      ],
    },
    {
      path: `/${StudyPath.main}/${StudyPath['association-gks']}/${CommonPath.edit}/:studyId`,
      element: <MainLayout noWrapper />,
      children: [
        {
          path: '',
          element: (
            <SuspenseUI>
              <StudyInKoreaEditPage type={StudyTypeEnum.ASSOCIATION_GKS} />
            </SuspenseUI>
          ),
        },
      ],
    },
    {
      path: `/${StudyPath.main}/${StudyPath['news-of-study']}/${CommonPath.edit}/:studyId`,
      element: <MainLayout noWrapper />,
      children: [
        {
          path: '',
          element: (
            <SuspenseUI>
              <StudyInKoreaEditPage type={StudyTypeEnum.NEWS_OF_STUDY} />
            </SuspenseUI>
          ),
        },
      ],
    },
    {
      path: `/${StudyPath.main}/${StudyPath['program-for-kor']}/${CommonPath.edit}/:studyId`,
      element: <MainLayout noWrapper />,
      children: [
        {
          path: '',
          element: (
            <SuspenseUI>
              <StudyInKoreaEditPage type={StudyTypeEnum.PROGRAM_FOR_KOR} />
            </SuspenseUI>
          ),
        },
      ],
    },
  ],
}