import { ThemeProvider } from '@mui/material'
import { useRoutes } from 'react-router-dom'
import { theme } from 'Theme'
import routes from './Routes'

export const App = () => {
  const routing = useRoutes(routes)
  return <ThemeProvider theme={theme}>{routing}</ThemeProvider>
}
