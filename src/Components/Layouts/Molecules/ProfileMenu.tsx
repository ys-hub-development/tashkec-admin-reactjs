import { AccountCircleIcon } from 'Icons'
import { useTranslation } from 'react-i18next'
import { ChevronDownIcon } from 'Icons/Chevron'
import { HeaderProfile } from 'Components/Layouts/Atoms'

export const ProfileMenu = () => {
  const { t } = useTranslation()
  return (
    <HeaderProfile direction='row' justifyContent='center' alignItems='center' spacing={1}>
      <AccountCircleIcon />
      <span>{t('profile')}</span>
      <ChevronDownIcon />
    </HeaderProfile>
  )
}