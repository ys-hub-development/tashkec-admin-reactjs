import { StyledHeader } from '../Atoms'
import { Stack } from '@mui/material'
import { HeaderHeading, ProfileMenu } from '../Molecules'

export const Header = () => {
  return (
    <StyledHeader>
      <Stack direction='row' justifyContent='space-between' alignItems='center'>
        <HeaderHeading />
        <ProfileMenu />
      </Stack>
    </StyledHeader>
  )
}
