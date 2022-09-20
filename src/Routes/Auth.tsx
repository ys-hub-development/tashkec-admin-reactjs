import { SuspenseUI } from 'Components/UI'
import { LoginPage } from 'Views/Auth'

export const authRoutes = {
  path: '',
  children: [
    {
      path: '/sign-in',
      element: (
        <SuspenseUI>
          <LoginPage />
        </SuspenseUI>
      ),
    },
  ],
}
