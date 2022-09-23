import { styled } from '@mui/material'

export const EditorWrapper = styled('div')(({ theme }) => ({
  '&.error': {
    '.jodit-container:not(.jodit_inline)': {
      borderColor: theme.palette.error.main,
    }
  },

  '.jodit-placeholder': {
    padding: 16
  },

  '.jodit-container:not(.jodit_inline)': {
    borderColor: theme.palette.text.secondary,
    borderRadius: 10,
    overflow: 'hidden',
  },

  '.jodit-toolbar-button button': {
    minHeight: 'unset',
    height: 24,
  },

  '.jodit-toolbar-button': {
    height: 24,
    margin: '12px 1px',
  },

  '.jodit-ui-separator': {
    height: 24,
    borderColor: theme.palette.text.secondary,
  },

  '.jodit-ui-group': {
    alignItems: 'center',
    backgroundColor: '#fff',
  },

  '.jodit-icon': {
    stroke: theme.palette.text.secondary,
    color: theme.palette.text.secondary,
    fill: theme.palette.text.secondary,
  },

  '.jodit-wysiwyg': {
    color: theme.palette.text.primary,
  },

  '.jodit-container:not(.jodit_inline) .jodit-wysiwyg': {
    padding: 16,
  },

  '.jodit-toolbar-button__button:hover:not([disabled])': {
    backgroundColor: 'unset',

    '.jodit-icon': {
      stroke: theme.palette.text.primary,
      color: theme.palette.text.primary,
      fill: theme.palette.text.primary,
    },
  },
}))