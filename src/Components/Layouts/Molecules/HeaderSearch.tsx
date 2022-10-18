import { Box, debounce, TextField } from '@mui/material'
import { SearchIcon } from 'Icons/Search'
import { useLocation, useSearchParams } from 'react-router-dom'
import { ChangeEvent, useCallback, useEffect, useRef } from 'react'

export const HeaderSearch = () => {
  const { pathname } = useLocation()
  const inputRef = useRef<HTMLInputElement>(null)
  const [searchParams, setSearchParams] = useSearchParams()
  const _search = searchParams.get('search')

  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      searchParams.delete('page')
      if (e.target.value.length > 2) {
        searchParams.set('search', e.target.value)
      } else {
        searchParams.delete('search')
      }
      setSearchParams(searchParams)
    },
    [searchParams, setSearchParams],
  )

  useEffect(() => {
    if (pathname && inputRef.current) {
      inputRef.current.value = ''
    }
  }, [pathname])

  return (
    <TextField
      defaultValue={_search || ''}
      size='small'
      placeholder='Поиск...'
      onChange={debounce(onChange, 300)}
      fullWidth
      inputRef={inputRef}
      InputProps={{
        sx: {
          paddingTop: '6px',
          paddingLeft: '4px',
          paddingBottom: '6px',
        },
        endAdornment: (
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} color='text.secondary'>
            <SearchIcon />
          </Box>
        ),
      }}
    />
  )
}
