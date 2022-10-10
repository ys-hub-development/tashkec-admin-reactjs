import { Box, Button, Dialog, DialogContent, DialogTitle, Grid, Typography } from '@mui/material'
import { Stack } from '@mui/system'
import { APP } from 'Constants/App'
import { ReactNode } from 'react'

type Props = {
  open: boolean
  onClose: () => void
  onAccept: () => void
  text?: ReactNode
}

export const ConfirmationDialog = ({ open, onClose, onAccept, text }: Props) => {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth='xs'>
      <DialogTitle sx={{ fontSize: 18, fontWeight: 600, position: 'relative', textAlign: 'center' }}>{APP.REMOVE_CONFIRMATION}</DialogTitle>
      <DialogContent>
        <Stack spacing={3} justifyContent='center'>
          {text && (
            <Typography lineHeight={1.5} fontSize={14} textAlign='center' variant='caption'>
              {text}
            </Typography>
          )}
          <Box>
            <Grid container pr={3} pl={3} columnSpacing={4}>
              <Grid item xs={6}>
                <Button className='light' onClick={onClose} fullWidth>
                  {APP.CANCEL}
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button onClick={onAccept} fullWidth>
                  {APP.CONFIRM}
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Stack>
      </DialogContent>
    </Dialog>
  )
}
