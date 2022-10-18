import { lazy } from 'react'

export const AnswersPage = lazy(() => import('./Answers'))
export const AnswerAddPage = lazy(() => import('./AnswerAdd'))
export const AnswerEditPage = lazy(() => import('./AnswerEdit'))
export const QuestionsPage = lazy(() => import('./Questions'))