import { Box, Button } from '@mui/material'
import { TrashIcon } from 'Icons/Trash'
import { APP } from 'Constants/App'
import { PictureBox } from '../Atoms'

type Props = {
  id: number
  url: string,
  onRemove: (id: number) => void,
  className?: string
}

export const PictureItem = ({ url, onRemove, id, className }: Props) => {
  return (
    <PictureBox className={className} spacing={1}>
      <Box className='img-box'><img src={url} alt={url} /></Box>
      <Button
        startIcon={<TrashIcon />}
        onClick={() => onRemove(id)}
        color='secondary'
        className='light'>
        {APP.REMOVE}
      </Button>
    </PictureBox>
  )
}