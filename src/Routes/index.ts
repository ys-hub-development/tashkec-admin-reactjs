import { aboutRoutes } from './About'
import { authRoutes } from './Auth'
import { baseRoutes } from './Base'
import { mainRoutes } from './Main'
import { userRoutes } from './User'

export default [ { ...baseRoutes }, { ...authRoutes }, { ...mainRoutes }, { ...aboutRoutes }, { ...userRoutes } ]
