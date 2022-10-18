import { ChangeEvent, useCallback, useEffect, useMemo, useState } from 'react'
import { QueryParams } from 'Types/api'
import { queryClient } from 'index'
import { useInfiniteQuery } from '@tanstack/react-query'
import httpClient from 'Service'
import { AxiosResponse } from 'axios'


type Props = {
  url: string,
  params?: Omit<QueryParams, 'page' | 'size'>
  enabled: boolean,
  infinite?: boolean
  key?: string,
  isCached?: boolean,
}

export function useInfiniteList<D>({ url, params, enabled, infinite, key, isCached = true }: Props) {
  const [query, setQuery] = useState<Omit<QueryParams, 'page' | 'size'> | null>(null)

  const cacheKey = useMemo((): string[] => {
    const tmp: string[] = [url]
    if (key) {
      tmp.push(key)
    }
    if (params) {
      tmp.push(JSON.stringify(params))
    }
    if (query) {
      tmp.push(JSON.stringify(query))
    }
    return tmp
  }, [url, params, query, key])


  const cached = useMemo(() => {
    return !!query && queryClient.getQueryState(cacheKey)?.data
  }, [cacheKey, query])

  const allowedToCache = useMemo(() => {
    return isCached ? !cached : true
  }, [isCached, cached])

  const infiniteQuery = useInfiniteQuery<AxiosResponse<D[]>, any, AxiosResponse<D[]>>(
    cacheKey,
    async ({ pageParam = 0 }) => {
      return await httpClient.get<D[]>(url, {
        params: query
          ? {
            ...query,
            size: 10,
            page: pageParam,
          }
          : { size: 10, page: pageParam },
      })
    },
    {
      getNextPageParam: (data) => {
        const count: string | undefined = data.headers?.['x-total-count']
        const page: number = data.config.params.page

        if (count && Number(count) > (page * 10) ) {
          return page + 1
        } else {
          return undefined
        }
      },
      enabled: enabled && !!query && allowedToCache,
    },
  )

  const list = useMemo((): D[] => {
    let tmp: D[] = []
    const groups = infiniteQuery.data?.pages || []
    for (const g of groups) {
      tmp = [...tmp, ...g.data]
    }
    return tmp
  }, [infiniteQuery.data?.pages])

  useEffect(() => {
    let timeout: NodeJS.Timeout

    // eslint-disable-next-line prefer-const
    timeout = setTimeout(() => {
      const tmp: Omit<QueryParams, 'page' | 'size'> = {
        ...(params ? { ...params } : {}),
      }
      setQuery(tmp)
    }, 300)

    return () => {
      clearTimeout(timeout)
    }
  }, [params])

  const getNextData = useCallback((e?: any) => {
    e.persist()
    const { isLoading, hasNextPage, fetchNextPage } = infiniteQuery
    const { target } = e
    if (target.scrollTop + target.offsetHeight === target.scrollHeight && !isLoading && hasNextPage) {
      fetchNextPage()
    }
  }, [infiniteQuery])

  const onSearch = useCallback(
    (value: string | null) => {
      const p = query ? { ...query } : {}
      if (value) {
        p.searchValue = value
      } else {
        delete p.searchValue
      }
      setQuery(p)
    },
    [query],
  )

  const onSearchInput = useCallback(
    ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
      const p = query ? { ...query } : {}
      if (value) {
        p.searchValue = value
      } else {
        delete p.searchValue
      }
      setQuery(p)
    },
    [query],
  )

  useEffect(() => {
    const { hasNextPage, fetchNextPage } = infiniteQuery
    if (infinite && hasNextPage) {
      fetchNextPage()
    }
  }, [infiniteQuery, infinite])

  return {
    infiniteQuery,
    list,
    onSearch,
    getNextData,
    onSearchInput,
    params,
  }
}

