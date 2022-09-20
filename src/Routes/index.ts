import { authRoutes } from './Auth'
import { baseRoutes } from './Base'
import { mainRoutes } from './Main'

export default [{ ...baseRoutes }, { ...authRoutes }, { ...mainRoutes }]
