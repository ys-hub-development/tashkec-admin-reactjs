import { ThemeProvider } from '@mui/material'
import { useRoutes } from 'react-router-dom'
import { theme } from 'Theme'
import routes from './Routes'
import { DialogUI } from 'Components/UI'
import { useAccountMe } from 'Hooks'
import { ToastContainer } from 'react-toastify'

export const App = () => {
  useAccountMe()
  const routing = useRoutes(routes)
  return (
    <ThemeProvider theme={theme}>
      <DialogUI />
      {routing}
      <ToastContainer theme='colored' autoClose={5000} closeOnClick pauseOnFocusLoss />
    </ThemeProvider>
  )
}
