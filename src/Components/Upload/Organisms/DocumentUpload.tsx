import { Button, Card, Typography } from '@mui/material'
import { Stack } from '@mui/system'
import { APP } from 'Constants/App'
import { PRIMARY_COLOR } from 'Constants/Colors'
import { PlusIcon } from 'Icons/Plus'
import { useRef } from 'react'

type Props = {
  fileName: null | string
  onChange?: (file: null | File) => void
  error?: string
  accept?: string
}

export const DocumentUpload = ({ fileName, onChange, error, accept }: Props) => {
  const ref = useRef<HTMLInputElement>(null)

  return (
    <>
      <Stack>
        <Typography variant='subtitle2' marginBottom={2}>
          {APP.DOCUMENT}
        </Typography>
        <Stack direction='row' alignItems='center' spacing={2}>
          {fileName ? (
            <>
              <Card style={{ backgroundColor: '#F7F7F7', boxShadow: 'unset', fontSize: 12 }}>{fileName}</Card>
              {onChange && (
                <Button variant='text' color='secondary' onClick={() => onChange(null)}>
                  {APP.REMOVE}
                </Button>
              )}
            </>
          ) : (
            <>
              <Button
                sx={{
                  backgroundColor: '#F7F7F7',
                  color: PRIMARY_COLOR.main,
                  '&:hover': { backgroundColor: '#F7F7F7' },
                }}
                startIcon={<PlusIcon />}
                onClick={() => ref?.current?.click()}>
                {APP.ADD_FILE}
              </Button>
              {error && (
                <Typography fontSize={12} fontWeight={400} variant='subtitle2' color='error.main'>
                  {error}
                </Typography>
              )}
            </>
          )}
        </Stack>
      </Stack>
      {onChange && (
        <input
          accept={accept || 'application/pdf'}
          ref={ref}
          type='file'
          onChange={e => onChange(e.target.files ? e.target.files[0] : null)}
          style={{ display: 'none' }}
        />
      )}
    </>
  )
}
