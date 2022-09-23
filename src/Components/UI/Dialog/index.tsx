import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import { useStore } from 'effector-react'
import { $AppUI, updateDialogEvent } from 'Models'
import { ClearIcon } from 'Icons/Clear'

export const DialogUI = () => {
  const { dialog } = useStore($AppUI)
  return (
    <>
      {
        dialog && (
          <Dialog
            open={!!dialog}
            onClose={() => updateDialogEvent(null)}
            {...dialog?.props}
          >
            <DialogTitle sx={{ textAlign: 'center', fontSize: 18, fontWeight: 600, position: 'relative' }}>
              {dialog?.title || ''}
              <div className='close-dialog' onClick={() => updateDialogEvent(null)}>
                <ClearIcon />
              </div>
            </DialogTitle>
            <DialogContent>
              {
                typeof dialog?.content === 'string'
                  ? (
                    <DialogContentText>
                      {dialog.content}
                    </DialogContentText>
                  )
                  : dialog?.content
              }
            </DialogContent>
            {
              dialog?.agreeAction && (
                <DialogActions>
                  <Button
                    size='small'
                    variant='outlined'
                    color='error'
                    sx={{ minWidth: 70 }}
                    onClick={() => updateDialogEvent(null)}
                  >
                    Нет
                  </Button>
                  <Button
                    size='small'
                    variant='outlined'
                    color='success'
                    sx={{ minWidth: 70 }}
                    onClick={() => {
                      dialog.agreeAction && dialog.agreeAction()
                    }}
                  >
                    Да
                  </Button>
                </DialogActions>
              )
            }
          </Dialog>
        )
      }
    </>
  )
}