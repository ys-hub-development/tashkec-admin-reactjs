import { lazy } from 'react'

export const UsersPage = lazy(() => import('./List'))
export const UserAddPage = lazy(() => import('./Add'))
export const UserEditPage = lazy(() => import('./Edit'))