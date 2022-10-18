import { Box, Pagination } from '@mui/material'
import { useSearchParams } from 'react-router-dom'
import { useCallback } from 'react'
import { URL_KEYS } from 'Constants/Url'

type Props = {
  length: number,
}

export const PaginationUI = ({ length }: Props) => {
  const [ searchParams, setSearchParams ] = useSearchParams()
  const _page = searchParams.get(URL_KEYS.PAGE) ? Number(searchParams.get(URL_KEYS.PAGE)) : 1

  const onChangePage = useCallback((page: number) => {
    searchParams.set(URL_KEYS.PAGE, String(page))
    setSearchParams(searchParams)
  }, [ searchParams, setSearchParams ])

  return (
    <>
      {
        length > 10 && (
          <Box marginTop={4} display='flex' justifyContent='center'>
            <Pagination
              count={Math.ceil(length / 10)}
              className='custom-pagination'
              page={_page}
              onChange={(event, page) => onChangePage(page)}
            />
          </Box>
        )
      }
    </>
  )
}