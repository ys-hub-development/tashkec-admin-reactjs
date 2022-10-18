import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { QueryParams } from 'Types/api'
import { URL_KEYS } from 'Constants/Url'

type Props = {
  limit: number
}

export function useListQueryParams({ limit }: Props) {
  const [ searchParams ] = useSearchParams()
  const _page = searchParams.get(URL_KEYS.PAGE) ? Number(searchParams.get(URL_KEYS.PAGE)) : 0
  const _search = searchParams.get(URL_KEYS.SEARCH)

  return useMemo(() => {
    const tmp: QueryParams = {
      size: limit,
      page: _page ? _page - 1 : _page,
    }

    if (_search) {
      tmp.searchValue = _search
    } else {
      delete tmp.searchValue
    }

    return tmp
  }, [ _page, _search, limit ])
}