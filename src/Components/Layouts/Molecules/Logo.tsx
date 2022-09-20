import { LogoLink } from 'Components/Layouts/Atoms'

export const Logo = () => {
  return (
    <LogoLink to='/'>
      <img src='/media/images/logo.png' alt='logo' />
      Tashkec
    </LogoLink>
  )
}
