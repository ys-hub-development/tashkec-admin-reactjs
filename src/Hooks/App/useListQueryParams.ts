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

  return useMemo(() => {
    const tmp: QueryParams = {
      size: limit,
      page: _page,
    }

    return tmp
  }, [ _page, limit ])
}