import { CKEditor } from 'ckeditor4-react'

const config = {
  extraPlugins: 'justify,font,colorbutton,uploadimage',
  filebrowserUploadUrl: 'https://tashkec.herokuapp.com/api/attachments/editor',
  toolbarGroups: [
    { name: 'document', groups: ['mode', 'document', 'doctools'] },
    { name: 'clipboard', groups: ['clipboard', 'undo'] },
    { name: 'editing', groups: ['find', 'selection', 'spellchecker'] },
    { name: 'forms' },
    { name: 'basicstyles', groups: ['basicstyles', 'cleanup'] },
    {
      name: 'paragraph',
      groups: ['list', 'indent', 'blocks', 'align', 'bidi'], // 'align' -> 'justify' plugin
    },
    { name: 'links' },
    { name: 'insert' },
    '/',
    { name: 'styles' }, // 'font and fontsize' -> 'font' plugin
    { name: 'colors' }, // 'colors' -> 'colorbutton' plugin
    { name: 'tools' },
    { name: 'others' },
    { name: 'about' },
  ],
}

export const CKEditorUI = () => {
  return (
    <CKEditor
      onFileUploadRequest={e => {
        console.log(e)
      }}
      config={config}
      initData='<p>This is an example CKEditor 4 WYSIWYG editor instance.</p>'
    />
  )
}
