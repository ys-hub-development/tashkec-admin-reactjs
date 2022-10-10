import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react'
import { Avatar, Button, Stack, Typography } from '@mui/material'
import { PlusIcon } from 'Icons/Plus'
import { APP } from 'Constants/App'
import { PRIMARY_COLOR } from 'Constants/Colors'
import { fileToBase64 } from 'Utils'

type Props = {
  url: string | null
  onUpload: (file: File | null) => void
  onRemove: () => void
  error?: string
}

export const SimpleUpload = ({ url, onUpload, onRemove, error }: Props) => {
  const [img, setImg] = useState<any | null>(null)
  const ref = useRef<HTMLInputElement>(null)

  const onChange = useCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      if (e?.target?.files) {
        try {
          const url = await fileToBase64(e.target.files[0])
          setImg(url)
          onUpload(e.target.files[0])
        } catch (e) {
          console.log(e)
        }
      }
    },
    [onUpload],
  )

  useEffect(() => {
    if (img === null && url) {
      setImg(url)
    }
  }, [img, url])

  const onClick = useCallback(() => {
    setImg(0)
    onRemove()
  }, [onRemove])

  return (
    <>
      <Stack>
        <Typography variant='subtitle2' marginBottom={2}>
          {APP.PHOTO}
        </Typography>
        <Stack direction='row' alignItems='center' spacing={2}>
          {img ? (
            <>
              <Avatar src={img} sx={{ width: 96, height: 96 }} variant='rounded' />
              <Button variant='text' color='secondary' onClick={onClick}>
                {APP.REMOVE_PHOTO}
              </Button>
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
      <input ref={ref} type='file' onChange={onChange} style={{ display: 'none' }} />
    </>
  )
}
