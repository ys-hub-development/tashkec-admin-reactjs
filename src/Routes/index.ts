import { aboutRoutes } from './About'
import { authRoutes } from './Auth'
import { baseRoutes } from './Base'
import { mainRoutes } from './Main'
import { userRoutes } from './User'
import { newsRoutes } from './News'
import { institutionRoutes } from './Institution'
import { settingsRoutes } from './Settings'
import { materialRoutes } from './Materials'
import { studyRoutes } from './Study'
import { faqRoutes } from './Faq'
import { cultureRoutes } from './Culture'
import { galleryRoutes } from './Gallery'

export default [
  { ...baseRoutes },
  { ...authRoutes },
  { ...mainRoutes },
  { ...aboutRoutes },
  { ...userRoutes },
  { ...settingsRoutes },
  { ...newsRoutes },
  { ...institutionRoutes },
  { ...materialRoutes },
  { ...studyRoutes },
  { ...faqRoutes },
  { ...cultureRoutes },
  {...galleryRoutes}
]
