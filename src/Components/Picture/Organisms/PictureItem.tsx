import { Box, Button, CircularProgress, Grid } from '@mui/material'
import { APP } from 'Constants/App'
import { TrashIcon } from 'Icons/Trash'
import { PictureBox } from '../Atoms'
import { EditPencilIcon } from 'Icons/Edit'
import cn from 'classnames'

type Props = {
  id: number
  url: string
  onRemove: (id: number) => void
  onEdit?: (id: number) => void
  className?: string
  isLoading?: boolean
  hoverAction?: { title: string; action: (id: number) => void }
  activeTitle?: string
}

export const PictureItem = ({ url, onRemove, id, className, isLoading, onEdit, hoverAction, activeTitle }: Props) => {
  return (
    <PictureBox className={className} spacing={1.75}>
      <Box className={cn('img-box', { hovered: !!hoverAction, active: !!activeTitle })}>
        <img src={url} alt={url} />
        {hoverAction && (
          <Button className='hover-action' size='small' onClick={() => hoverAction.action(id)}>
            {hoverAction.title}
          </Button>
        )}
        {activeTitle && <div className='active-title'>{activeTitle}</div>}
      </Box>
      <Box>
        {onEdit ? (
          <Grid container columnSpacing={1.75}>
            <Grid item xs={6}>
              <Button startIcon={<EditPencilIcon />} onClick={() => onEdit(id)} className='light' fullWidth>
                {APP.CHANGE}
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                startIcon={isLoading ? <CircularProgress color='inherit' size={20} /> : <TrashIcon />}
                onClick={() => !isLoading && onRemove(id)}
                color='secondary'
                className='light'
                fullWidth>
                {APP.REMOVE}
              </Button>
            </Grid>
          </Grid>
        ) : (
          <Button
            fullWidth
            color='secondary'
            className='light'
            onClick={() => !isLoading && onRemove(id)}
            startIcon={isLoading ? <CircularProgress color='inherit' size={20} /> : <TrashIcon />}>
            {APP.REMOVE}
          </Button>
        )}
      </Box>
    </PictureBox>
  )
}
