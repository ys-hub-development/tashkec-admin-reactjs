import { lazy } from 'react'

export const NewsListPage = lazy(() => import('./News'))
export const NewsAddPage = lazy(() => import('./NewsAdd'))
export const NewsEditPage = lazy(() => import('./NewsEdit'))
export const EventListPage = lazy(() => import('./Events'))
export const EventAddPage = lazy(() => import('./EventAdd'))
export const EventEditPage = lazy(() => import('./EventEdit'))
