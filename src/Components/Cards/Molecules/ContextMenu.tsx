import { APP } from 'Constants/App'
import { TrashIcon } from 'Icons/Trash'
import { EditPencilIcon } from 'Icons/Edit'
import { MouseEvent, useState } from 'react'
import { VerticalMoreIcon } from 'Icons/More'
import { ERROR_COLOR } from 'Constants/Colors'
import { Button, Menu, MenuItem, Stack, Typography } from '@mui/material'

type Props = {
  id: number,
  onRemove: (id: number) => void,
  onEdit: (id: number) => void
}

export const ContextMenu = ({ id, onRemove, onEdit }: Props) => {
  const [ anchorEl, setAnchorEl ] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  return (
    <div>
      <Button
        variant='text'
        size='small'
        aria-haspopup='true'
        onClick={handleClick}
        id={`basic-button-${id}`}
        sx={{ minWidth: 'unset' }}
        aria-expanded={open || undefined}
        aria-controls={open ? 'basic-menu' : undefined}
      >
        <VerticalMoreIcon />
      </Button>
      <Menu
        open={open}
        anchorEl={anchorEl}
        id={`basic-button-${id}`}
        onClose={() => setAnchorEl(null)}
        PaperProps={{ className: 'box-shadow' }}
        MenuListProps={{ 'aria-labelledby': `basic-button-${id}` }}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem onClick={() => onEdit(id)}>
          <Stack direction='row' color='primary.main' spacing={1} alignItems='center'>
            <EditPencilIcon />
            <Typography variant='body2' color='primary.main'>{APP.CHANGE}</Typography>
          </Stack>
        </MenuItem>
        <MenuItem onClick={() => onRemove(id)} color={ERROR_COLOR.main}>
          <Stack direction='row' color='secondary.main' spacing={1} alignItems='center'>
            <TrashIcon />
            <Typography variant='body2' color='secondary.main'>{APP.REMOVE}</Typography>
          </Stack>
        </MenuItem>
      </Menu>
    </div>
  )
}