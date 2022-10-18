import { Stack } from '@mui/system'
import cn from 'classnames'
import { URL_KEYS } from 'Constants/Url'
import { formLangTab } from 'Data/app'
import { useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'
import { LangType } from 'Types/app'
import { LangFilterItem } from '../Atoms'

export const LangFilter = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const _lang = searchParams.get(URL_KEYS.LANG)

  const handleClick = useCallback(
    (value: LangType) => {
      searchParams.set(URL_KEYS.LANG, value)
      setSearchParams(searchParams)
    },
    [searchParams, setSearchParams],
  )

  return (
    <div>
      <Stack direction='row' spacing={1.5}>
        {formLangTab.map(item => (
          <LangFilterItem
            onClick={() => handleClick(item.id)}
            className={cn({ active: (_lang && item.id === _lang) || (item.id === 'Ru' && !_lang) })}
            key={item.id}>
            {item.label}
          </LangFilterItem>
        ))}
      </Stack>
    </div>
  )
}
