import { createStore } from 'effector'
import { AppStore } from 'Models/App/types'
import { getAppAuthStatus } from 'Models/App/Events'

export const $AppStore = createStore<AppStore>({ isAuthenticated: true })
  .on(getAppAuthStatus, (state, status) => ({ ...state, isAuthenticated: status }))
