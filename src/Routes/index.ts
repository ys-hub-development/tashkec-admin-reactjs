import { aboutRoutes } from './About'
import { authRoutes } from './Auth'
import { baseRoutes } from './Base'
import { mainRoutes } from './Main'
import { userRoutes } from './User'
import { settingsRoutes } from 'Routes/Settings'

export default [
  { ...baseRoutes },
  { ...authRoutes },
  { ...mainRoutes },
  { ...aboutRoutes },
  { ...userRoutes },
  { ...settingsRoutes },
]
