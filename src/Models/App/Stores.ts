import { createStore } from 'effector'
import { AppStore } from 'Models/App/types'

export const $AppStore = createStore<AppStore>({ isAuthenticated: false })
