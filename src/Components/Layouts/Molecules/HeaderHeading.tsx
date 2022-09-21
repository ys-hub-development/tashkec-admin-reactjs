import { Typography } from '@mui/material'
import { useLayoutHeading } from 'Hooks'

export const HeaderHeading = () => {
  const { headerHeading } = useLayoutHeading()

  return <Typography variant='h2'>{headerHeading}</Typography>
}
