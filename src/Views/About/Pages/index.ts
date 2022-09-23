import { lazy } from 'react'

export const GreetingPage = lazy(() => import('./Greeting'))
export const StructurePage = lazy(() => import('./Structure'))
export const HistoryPage = lazy(() => import('./History'))