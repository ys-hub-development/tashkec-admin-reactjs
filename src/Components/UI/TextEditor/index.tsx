import { useRef } from 'react'
import { Typography } from '@mui/material'
import JoditEditor from 'jodit-react'
import cn from 'classnames'
import { EditorWrapper } from 'Components/UI/TextEditor/style'
import { TextEditorconfig } from 'Components/UI/TextEditor/_config'
import { InputHelperText } from 'Components/UI/FormElemnts/style'


type Props = {
  value: string
  onChange: (value: string) => void,
  onBlur?: () => void
  errorText?: string | boolean
  className?: string
  label: string
}

export const TextEditorUI = ({ value, onChange, errorText, className, label, onBlur }: Props) => {
  const editor = useRef(null)

  return (
    <>
      <Typography variant='subtitle2' marginBottom={1}>{label}</Typography>
      <EditorWrapper className={cn('html-editor-content', className || '', { error: !!errorText })}>
        <JoditEditor
          ref={editor}
          value={value}
          config={TextEditorconfig}
          onChange={(newContent) => onChange(newContent)}
          onBlur={() => onBlur && onBlur()}
        />
        <InputHelperText className={cn({ show: !!errorText, error: !!errorText })}>{errorText}</InputHelperText>
      </EditorWrapper>
    </>
  )
}