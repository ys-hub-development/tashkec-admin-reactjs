import { createEvent } from 'effector'
import { Dialog } from './types'

export const getAppAuthStatus = createEvent<boolean>()
export const updateDialogEvent = createEvent<Dialog | null>()