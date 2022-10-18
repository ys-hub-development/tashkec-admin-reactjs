import { CRUDApi, CrudServiceProps } from 'Types/app'
import { useEffect, useState } from 'react'
import { QueryParams } from 'Types/api'
import { useListQueryParams } from 'Hooks/App/useListQueryParams'
import { useApiQuery } from 'Hooks/App/useApiQuery'
import { useMutation } from '@tanstack/react-query'
import httpClient from 'Service'
import { toast } from 'react-toastify'
import { APP } from 'Constants/App'

export function useCRUDApi<ListModel, Model, Data>({
  key,
  url,
  useDefaultQuery,
  params,
  enabled,
  detailId,
  initList,
  axiosParam,
  extraId,
}: CrudServiceProps) {
  const [query, setQuery] = useState<QueryParams | undefined>(undefined)
  const p = useListQueryParams({ limit: 10 })

  const listQuery = useApiQuery<ListModel>({
    url: extraId ? `${url}/${extraId}` : url,
    key,
    params: query,
    options: { enabled: !!query && enabled && initList },
  })

  const detailQuery = useApiQuery<Model>({
    key: `${key}Detail${detailId}`,
    url: `${url}/${detailId}`,
    options: {
      enabled: enabled && !!detailId,
    },
  })

  const create = useMutation(
    ({ data }: CRUDApi<Data>) => {
      return httpClient.post<Model>(url, data, { ...(axiosParam || {}) })
    },
    {
      onSuccess: ({ data }, { action, noMessage }) => {
        if (action) {
          action({data})
        }
        if(!noMessage) {
          toast.success(APP.DATA_SUCCESS_SAVED)
        }
      },
      onError: (_, { action }) => {
        if (action) {
          action({ err: true })
        }
      },
    },
  )

  const update = useMutation(
    ({ data, id }: CRUDApi<Partial<Data>>) => {
      return httpClient.patch<Model>(`${url}/${id}`, data, { ...(axiosParam || {}) })
    },
    {
      onSuccess: ({data}, { action, noMessage }) => {
        if (action) {
          action({data})
        }

        if(!noMessage) {
          toast.success(APP.DATA_SUCCESS_CHANGED)
        }
      },
      onError: (_, { action }) => {
        if (action) {
          action({ err: true })
        }
      },
    },
  )

  const remove = useMutation(({ id }: Omit<CRUDApi<any>, 'data'>) => httpClient.delete(`${url}/${id}`), {
    onSuccess: (_, { action }) => {
      if (action) {
        action()
      }
      toast.success(APP.DATA_SUCCESS_REMOVED)
    },
    onError: (_, { action }) => {
      if (action) {
        action({ err: true })
      }
    },
  })

  useEffect(() => {
    let timeout: NodeJS.Timeout

    // eslint-disable-next-line prefer-const
    timeout = setTimeout(() => {
      if (useDefaultQuery && params) {
        setQuery(params)
      } else {
        setQuery(p)
      }
    }, 300)

    return () => {
      clearTimeout(timeout)
    }
  }, [p, useDefaultQuery, params])

  return {
    listQuery,
    detailQuery,
    remove,
    create,
    update,
  }
}
