import { CommonPath, InstitutionPath } from 'Constants/Navigation'
import { MainLayout } from 'Components/Layouts'
import { SuspenseUI } from 'Components/UI'
import { UniversityAddPage, UniversityEditPage, UniversityPage } from 'Views/University'
import { EducationTypeEnum } from 'Entities/institution'

export const institutionRoutes = {
  path: '',
  children: [
    {
      path: `/${InstitutionPath.main}`,
      element: <MainLayout />,
      children: [
        {
          path: InstitutionPath['college-lyceum'],
          children: [
            {
              path: '',
              element: (
                <SuspenseUI>
                  <UniversityPage type={EducationTypeEnum.COLLEGE_AND_LYCEUM} />
                </SuspenseUI>
              ),
            },
            {
              path: CommonPath.add,
              element: (
                <SuspenseUI>
                  <UniversityAddPage type={EducationTypeEnum.COLLEGE_AND_LYCEUM} />
                </SuspenseUI>
              ),
            },
          ],
        },
        {
          path: InstitutionPath['korean-university'],
          children: [
            {
              path: '',
              element: (
                <SuspenseUI>
                  <UniversityPage type={EducationTypeEnum.KOREAN_UNIVERSITY} />
                </SuspenseUI>
              ),
            },
            {
              path: CommonPath.add,
              element: (
                <SuspenseUI>
                  <UniversityAddPage type={EducationTypeEnum.KOREAN_UNIVERSITY} />
                </SuspenseUI>
              ),
            },
          ],
        },
        {
          path: InstitutionPath['uzbekistan-university'],
          children: [
            {
              path: '',
              element: (
                <SuspenseUI>
                  <UniversityPage type={EducationTypeEnum.UZBEKISTAN_UNIVERSITY} />
                </SuspenseUI>
              ),
            },
            {
              path: CommonPath.add,
              element: (
                <SuspenseUI>
                  <UniversityAddPage type={EducationTypeEnum.UZBEKISTAN_UNIVERSITY} />
                </SuspenseUI>
              ),
            },
          ],
        },
        {
          path: InstitutionPath.school,
          children: [
            {
              path: '',
              element: (
                <SuspenseUI>
                  <UniversityPage type={EducationTypeEnum.SCHOOL} />
                </SuspenseUI>
              ),
            },
            {
              path: CommonPath.add,
              element: (
                <SuspenseUI>
                  <UniversityAddPage type={EducationTypeEnum.SCHOOL} />
                </SuspenseUI>
              ),
            },
          ],
        },
      ],
    },
    {
      path: `/${InstitutionPath.main}/${InstitutionPath['college-lyceum']}/${CommonPath.edit}/:institutionId`,
      element: <MainLayout noWrapper />,
      children: [
        {
          path: '',
          element: (
            <SuspenseUI>
              <UniversityEditPage type={EducationTypeEnum.COLLEGE_AND_LYCEUM} />
            </SuspenseUI>
          ),
        },
      ],
    },
    {
      path: `/${InstitutionPath.main}/${InstitutionPath['korean-university']}/${CommonPath.edit}/:institutionId`,
      element: <MainLayout noWrapper />,
      children: [
        {
          path: '',
          element: (
            <SuspenseUI>
              <UniversityEditPage type={EducationTypeEnum.KOREAN_UNIVERSITY} />
            </SuspenseUI>
          ),
        },
      ],
    },
    {
      path: `/${InstitutionPath.main}/${InstitutionPath['uzbekistan-university']}/${CommonPath.edit}/:institutionId`,
      element: <MainLayout noWrapper />,
      children: [
        {
          path: '',
          element: (
            <SuspenseUI>
              <UniversityEditPage type={EducationTypeEnum.UZBEKISTAN_UNIVERSITY} />
            </SuspenseUI>
          ),
        },
      ],
    },
    {
      path: `/${InstitutionPath.main}/${InstitutionPath.school}/${CommonPath.edit}/:institutionId`,
      element: <MainLayout noWrapper />,
      children: [
        {
          path: '',
          element: (
            <SuspenseUI>
              <UniversityEditPage type={EducationTypeEnum.SCHOOL} />
            </SuspenseUI>
          ),
        },
      ],
    },
  ],
}