import { createStore } from 'effector'
import { AppStore, AppUI } from 'Models/App/types'
import { fetchAccountMe, getAppAuthStatus, updateDialogEvent } from 'Models/App/Events'
import Cookies from 'js-cookie'
import { UserBasic } from 'Entities/account'

const tokenFromStorage = Cookies.get('token')

export const $AppStore = createStore<AppStore>({ isAuthenticated: !!tokenFromStorage })
  .on(getAppAuthStatus, (state, status) => ({ ...state, isAuthenticated: status }))

export const $AppUI = createStore<AppUI>({
  message: null,
  dialog: null,
  drawer: null,
})
  .on(updateDialogEvent, (state, dialog) => ({ ...state, dialog }))

const account: UserBasic | null = localStorage.getItem('user') ? JSON.parse(<string>localStorage.getItem('user')) : null

export const $Account = createStore<UserBasic | null>(account)
  .on(fetchAccountMe.done, (state, payload) => payload.result.data)


$Account.watch((state) => {
  if (state) {
    localStorage.setItem('user', JSON.stringify(state))
  }
})
