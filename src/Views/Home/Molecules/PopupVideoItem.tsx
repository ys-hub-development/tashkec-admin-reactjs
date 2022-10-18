import ReactPlayer from 'react-player';
import { Box, Button, CircularProgress, Grid } from '@mui/material'
import { APP } from 'Constants/App'
import { TrashIcon } from 'Icons/Trash'
import { PictureBox } from 'Components/Picture';

type Props = {
  id: number
  url: string,
  onRemove: (id: number) => void,
  onEdit?: (id: number) => void
  className?: string
  isLoading?: boolean
}

export const PopupVideoItem = ({onEdit, url, isLoading, id, className, onRemove}: Props) => {
  return (
    <PictureBox className={className} spacing={1.75}>
      <Box className='img-box'>
        <ReactPlayer height={200} width='100%' url={url} controls />
      </Box>
      <Box>
        {
          onEdit
            ? (
              <Grid container columnSpacing={1.75}>
                <Grid item xs={6}>
                  <Button onClick={() => onEdit(id)} className='light' fullWidth>
                    {APP.CHANGE}
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Button
                    startIcon={isLoading ? <CircularProgress color='inherit' size={20} /> : <TrashIcon />}
                    onClick={() => !isLoading && onRemove(id)}
                    color='secondary'
                    className='light'
                    fullWidth
                  >

                    {APP.REMOVE}
                  </Button>
                </Grid>
              </Grid>
            )
            : (
              <Button
                fullWidth
                color='secondary'
                className='light'
                onClick={() => !isLoading && onRemove(id)}
                startIcon={isLoading ? <CircularProgress color='inherit' size={20} /> : <TrashIcon />}
              >
                {APP.REMOVE}
              </Button>
            )
        }
      </Box>

    </PictureBox>
  )
}