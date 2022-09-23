import { createStore } from 'effector'
import { AppStore, AppUI } from 'Models/App/types'
import { getAppAuthStatus, updateDialogEvent } from 'Models/App/Events'
import Cookies from 'js-cookie'

const tokenFromStorage = Cookies.get('token')

export const $AppStore = createStore<AppStore>({ isAuthenticated: !!tokenFromStorage })
  .on(getAppAuthStatus, (state, status) => ({ ...state, isAuthenticated: status }))

export const $AppUI = createStore<AppUI>({
  message: null,
  dialog: null,
  drawer: null,
})
  .on(updateDialogEvent, (state, dialog) => ({...state, dialog}))

