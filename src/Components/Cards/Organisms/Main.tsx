import { CardWrapper } from 'Components/Cards/Atoms'
import { Stack, Typography } from '@mui/material'
import { ContextMenu } from 'Components/Cards/Molecules'

type Props = {
  text: string
  date?: string
  id: number
  onEdit: (id: number) => void
  onRemove: (id: number) => void
}

export const MainCard = ({ text, date, ...props }: Props) => {
  return (
    <CardWrapper>
      <Stack direction='row' spacing={4} alignItems='center' justifyContent='space-between'>
        <Typography variant='body1'>
          <span className='line-clamp-2'>{text}</span>
        </Typography>
        <Stack direction='row' alignItems='center' spacing={4}>
          {date && <Typography variant='caption'>{date}</Typography>}
          <ContextMenu {...props} />
        </Stack>
      </Stack>
    </CardWrapper>
  )
}
