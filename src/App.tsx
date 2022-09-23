import { ThemeProvider } from '@mui/material'
import { useRoutes } from 'react-router-dom'
import { theme } from 'Theme'
import routes from './Routes'
import { DialogUI } from 'Components/UI'

export const App = () => {
  // useAccountMe()
  const routing = useRoutes(routes)
  return (
    <ThemeProvider theme={theme}>
      <DialogUI />
      {routing}
    </ThemeProvider>
  )
}
