import { createEffect, createEvent } from 'effector'
import { Dialog } from './types'
import httpClient from 'Service'
import { UserBasic } from 'Entities/account'

export const getAppAuthStatus = createEvent<boolean>()
export const updateDialogEvent = createEvent<Dialog | null>()
export const fetchAccountMe = createEffect({
  handler: () => httpClient.get<UserBasic>('/account/me')
})