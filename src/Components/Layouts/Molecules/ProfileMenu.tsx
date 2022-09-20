import { AccountCircleIcon } from 'Icons'
import { ChevronDownIcon } from 'Icons/Chevron'
import { HeaderProfile } from 'Components/Layouts/Atoms'

export const ProfileMenu = () => {
  return (
    <HeaderProfile direction='row' justifyContent='center' alignItems='center' spacing={1}>
      <AccountCircleIcon />
      <span>Профиль</span>
      <ChevronDownIcon />
    </HeaderProfile>
  )
}
