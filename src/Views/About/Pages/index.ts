import { lazy } from 'react'

export const GreetingPage = lazy(() => import('./Greeting'))
export const StructurePage = lazy(() => import('./Structure'))
export const HistoryPage = lazy(() => import('./History'))
export const HistoryAddPage = lazy(() => import('./HistoryAdd'))
export const WorkPlanPage = lazy(() => import('./WorkPlan'))
export const WorkPlanAddPage = lazy(() => import('./WorkPlanAdd'))
export const WorkPlanEditPage = lazy(() => import('./WorkPlanEdit'))
export const ContactInfoPage = lazy(() => import('./ContactInfo'))