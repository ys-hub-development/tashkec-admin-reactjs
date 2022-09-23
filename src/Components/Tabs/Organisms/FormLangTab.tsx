import { TabUI } from 'Components/UI'
import { ReactNode, useState } from 'react'

type Props = {
  render: (lang: string) => ReactNode
}

export const FormLangTab = ({render}: Props) => {
  const [ value, setValue ] = useState('ru')
  return (
    <TabUI onChange={setValue} value={value}>
      {render(value)}
    </TabUI>
  )
}