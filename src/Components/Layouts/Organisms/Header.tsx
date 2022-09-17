import { StyledHeader } from '../Atoms'
import { Stack } from '@mui/material'
import { ProfileMenu } from '../Molecules'

export const Header = () => {
  return (
    <StyledHeader>
      <Stack direction='row' justifyContent='flex-end'>
        <ProfileMenu />
      </Stack>
    </StyledHeader>
  )
}