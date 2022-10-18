import { lazy } from 'react'

export const GalleryPage = lazy(() => import('./Gallery'))
export const GalleryAddPage = lazy(() => import('./GalleryAdd'))
export const GalleryEditPage = lazy(() => import('./GalleryEdit'))