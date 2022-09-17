import logoSrc from 'Assets/images/logo.png'
import { LogoLink } from 'Components/Layouts/Atoms'

export const Logo = () => {
  return (
    <LogoLink to='/'>
      <img src={logoSrc} alt='logo' />
      Tashkec
    </LogoLink>
  )
}