import { ThemeProvider } from '@mui/material'
import { theme } from 'Config'
import { useRoutes } from 'react-router-dom'
import routes from './Routes'
import { I18nextProvider } from 'react-i18next'
import i18n from 'Lang'

export const App = () => {
  const routing = useRoutes(routes)
  return (

    <ThemeProvider theme={theme}>
      <I18nextProvider i18n={i18n}>
        {routing}
      </I18nextProvider>
    </ThemeProvider>

  )
}