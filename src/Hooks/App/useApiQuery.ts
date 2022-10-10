import { useMemo } from 'react'
import { useQuery, UseQueryOptions } from '@tanstack/react-query'
import httpClient from 'Service'
import { AxiosRequestHeaders, AxiosResponse } from 'axios'
import { queryClient } from 'index'
import { QueryParams } from 'Types/api'

export type ApiQueryArgs<Response, Error> = {
  key: string
  url: string;
  options?: Omit<UseQueryOptions<AxiosResponse<Response, Error>, (string | QueryParams)[]>, 'queryKey' | 'queryFn'>;
  headers?: AxiosRequestHeaders;
  params?: Omit<QueryParams, 'page' | 'size'>;
  useCache?: boolean;
};

export function useApiQuery<R, E = any>(
  {
    url,
    options,
    params,
    headers,
    useCache,
    key,
  }: ApiQueryArgs<R, E>) {
  const queryKey = useMemo(() => {
    const keys: string[] = [ key ]
    if (params) {
      const p: { [key: string]: string | number } = { ...params }
      for (const key in p) {
        keys.push(`${key}=${p[key]}`)
      }
    }

    if (headers) {
      const h: AxiosRequestHeaders = { ...headers }
      for (const key in h) {
        keys.push(`${key}=${h[key]}`)
      }
    }

    return keys
  }, [ headers, params, key ])

  const cache = useMemo(() => {
    if (queryKey.length > 0) {
      return queryKey.length > 0 && queryClient.getQueryState(queryKey)?.data
    }

    return true
  }, [ queryKey ])

  const op = useMemo((): any => {
    if (!useCache) {
      return options
    }

    return {
      ...(options ? { ...options } : {}),
      enabled: options?.enabled !== undefined ? (options.enabled ? options.enabled && !cache : false) : !cache,
    }
  }, [ options, cache, useCache ])

  const query = useQuery(queryKey, () => httpClient.get<R>(url, { params }), op)

  return {
    ...query,
    data: query.data?.data,
    axiosData: query.data,
    queryKey,
  }
}