import { CommonPath, FaqPath } from 'Constants/Navigation'
import { MainLayout } from 'Components/Layouts'
import { SuspenseUI } from 'Components/UI'
import { AnswerAddPage, AnswerEditPage, AnswersPage, QuestionsPage } from 'Views/Faq'
import { Navigate } from 'react-router-dom'

export const faqRoutes = {
  path: '',
  children: [
    {
      path: `/${FaqPath.main}`,
      element: <MainLayout />,
      children: [
        {
          path: '',
          element: <Navigate to={`/${FaqPath.main}/${FaqPath.answers}`} />
        },
        {
          path: FaqPath.questions,
          children: [
            {
              path: '',
              element: (
                <SuspenseUI>
                  <QuestionsPage />
                </SuspenseUI>
              ),
            },
          ],
        },
        {
          path: FaqPath.answers,
          children: [
            {
              path: '',
              element: (
                <SuspenseUI>
                  <AnswersPage />
                </SuspenseUI>
              ),
            },
            {
              path: CommonPath.add,
              element: (
                <SuspenseUI>
                  <AnswerAddPage />
                </SuspenseUI>
              ),
            },
            {
              path: `${CommonPath.edit}/:answerId`,
              element: (
                <SuspenseUI>
                  <AnswerEditPage />
                </SuspenseUI>
              ),
            },
          ],
        },
      ],
    },
  ],
}