import { ReactNode, useCallback } from 'react'
import { DropzoneProps, useDropzone } from 'react-dropzone'
import { DropzoneWrapper } from 'Components/UI/Dropzone/style'
import cn from 'classnames'
import { PlusIcon } from 'Icons/Plus'
import { Box } from '@mui/material'

type Props = Pick<DropzoneProps, 'accept' | 'multiple'> & {
  content?: ReactNode,
  onChange: (files: File[]) => void
}

export const DropzoneUI = ({ accept, content, multiple, onChange }: Props) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    onChange(acceptedFiles)
  }, [onChange])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept, multiple })

  return (
    <DropzoneWrapper {...getRootProps()} className={cn({ isDragActive })}>
      <input {...getInputProps()} />
      <Box padding='16px'>
        {
          content || <PlusIcon />
        }
      </Box>
    </DropzoneWrapper>
  )
}