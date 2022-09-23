import { useRef } from 'react'
import { Box } from '@mui/material'
import JoditEditor from 'jodit-react'
import cn from 'classnames'
import { EditorWrapper } from 'Components/UI/TextEditor/style'


type Props = {
  value: string
  onChange: (value: string) => void,
  onBlur?: () => void
  errorText?: string | boolean
  className?: string
  ref?: any
}

export const TextEditorUI = ({ value, onChange, errorText, className }: Props) => {
  const editor = useRef(null)
  const config = {
    lang: 'ru',
    removeButtons: [ 'source' ],
    readonly: false,
    statusbar: false,
    height: 400,
    uploader: { insertImageAsBase64URI: true },
    hotkeys: {
      redo: 'ctrl+z',
      undo: 'ctrl+y,ctrl+shift+z',
      indent: 'ctrl+]',
      outdent: 'ctrl+[',
      bold: 'ctrl+b',
      italic: 'ctrl+i',
      removeFormat: 'ctrl+shift+m',
      insertOrderedList: 'ctrl+shift+7',
      insertUnorderedList: 'ctrl+shift+8',
      openSearchDialog: 'ctrl+f',
      openReplaceDialog: 'ctrl+r',
    },
    askBeforePasteFromWord: false,
    askBeforePasteHTML: false,
    colors: {
      greyscale:  ['#000000', '#434343', '#666666', '#999999', '#B7B7B7', '#CCCCCC', '#D9D9D9', '#EFEFEF', '#F3F3F3', '#FFFFFF'],
      palette:    ['#980000', '#FF0000', '#FF9900', '#FFFF00', '#00F0F0', '#00FFFF', '#4A86E8', '#0000FF', '#9900FF', '#FF00FF'],
      full: [
        '#E6B8AF', '#F4CCCC', '#FCE5CD', '#FFF2CC', '#D9EAD3', '#D0E0E3', '#C9DAF8', '#CFE2F3', '#D9D2E9', '#EAD1DC',
        '#DD7E6B', '#EA9999', '#F9CB9C', '#FFE599', '#B6D7A8', '#A2C4C9', '#A4C2F4', '#9FC5E8', '#B4A7D6', '#D5A6BD',
        '#CC4125', '#E06666', '#F6B26B', '#FFD966', '#93C47D', '#76A5AF', '#6D9EEB', '#6FA8DC', '#8E7CC3', '#C27BA0',
        '#A61C00', '#CC0000', '#E69138', '#F1C232', '#6AA84F', '#45818E', '#3C78D8', '#3D85C6', '#674EA7', '#A64D79',
        '#85200C', '#990000', '#B45F06', '#BF9000', '#38761D', '#134F5C', '#1155CC', '#0B5394', '#351C75', '#733554',
        '#5B0F00', '#660000', '#783F04', '#7F6000', '#274E13', '#0C343D', '#1C4587', '#073763', '#20124D', '#4C1130'
      ]
    },
    buttons: [
      'source',
      'bold',
      'strikethrough',
      'underline',
      'italic', '|',
      'ul',
      'ol', '|',
      'outdent', 'indent',  '|',
      'font',
      'fontsize',
      'brush',
      'paragraph', '|',
      'image',
      'video',
      'table',
      'link', '|',
      'align', 'undo', 'redo', '|',
      'hr',
      'eraser',
      'copyformat',
      'symbol',
    ],
  }

  return (
    <EditorWrapper className={cn('html-editor-content', className || '', { error: !!errorText })}>
      <JoditEditor
        ref={editor}
        value={value}
        config={config}
        onBlur={(newContent) => onChange(newContent)} // preferred to use only this option to update the content for performance reasons
      />
      {
        errorText && (
          <Box
            sx={{
              color: theme => theme.palette.error.main,
              fontSize: '0.75rem',
              lineHeight: '1.66',
              textAlign: 'left',
              marginTop: '3px',
              marginRight: '14px',
              marginLeft: '14px',
            }}
          >
            {errorText}
          </Box>
        )
      }
    </EditorWrapper>
  )
}