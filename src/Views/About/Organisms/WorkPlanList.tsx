import { useApiQuery, useListQueryParams, useWorkPlan } from 'Hooks'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { URL_KEYS } from 'Constants/Url'
import { useCallback, useEffect, useState } from 'react'
import { WorkPlan } from 'Entities/about'
import { Grid } from '@mui/material'
import { MainCard } from 'Components/Cards'
import { AboutPath } from 'Constants/Navigation'
import { ConfirmationDialog } from 'Components/Dialog'
import { PaginationUI } from 'Components/UI'
import { SectionLoader } from 'Components/Section'
import { QueryParams } from 'Types/api'

export const WorkPlanList = () => {
  const p = useListQueryParams({ limit: 10 })
  const [query, setQuery] = useState<QueryParams | null>(null)
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const _lang = searchParams.get(URL_KEYS.LANG)
  const _timeType = searchParams.get(URL_KEYS.TIME_TYPE)
  const [removeId, setRemoveId] = useState<number | null>(null)
  const { remove } = useWorkPlan({ initList: false })
  const { data, axiosData, isFetching, isLoading, refetch } = useApiQuery<WorkPlan[]>({
    url: '/api/work-plans/time-type',
    key: 'workplanTIme',
    params: query || undefined,
    options: {
      enabled: !!query,
    },
  })

  useEffect(() => {
    let timeout: NodeJS.Timeout

    // eslint-disable-next-line prefer-const
    timeout = setTimeout(() => {
      const tmp: QueryParams = {
        ...p,
      }
      if (_timeType) {
        tmp.timeType = _timeType
      } else {
        delete tmp.timeType
      }
      setQuery(tmp)
    }, 300)

    return () => {
      clearTimeout(timeout)
    }
  }, [p, _timeType])

  const getTitle = useCallback(
    (item: WorkPlan) => {
      switch (_lang) {
        case 'Ru':
          return item.titleRu
        case 'Uz':
          return item.titleUz
        case 'Kr':
          return item.titleKr
        default:
          return item.titleRu
      }
    },
    [_lang],
  )

  const onEdit = useCallback(
    (id: number) => {
      navigate(`/${AboutPath.main}/${AboutPath.plan}/edit/${id}`)
    },
    [navigate],
  )

  const onRemove = useCallback(() => {
    if (removeId) {
      remove.mutate({ id: String(removeId), action: () => refetch() })
      setRemoveId(null)
    }
  }, [refetch, remove, removeId])

  return (
    <SectionLoader isLoading={isLoading} isFetching={isFetching}>
      <ConfirmationDialog open={!!removeId} onClose={() => setRemoveId(null)} onAccept={onRemove} />

      {!isLoading && data && (
        <>
          <Grid container rowSpacing={2}>
            {data.map(item => (
              <Grid item key={item.id} xs={12}>
                <MainCard onEdit={onEdit} onRemove={setRemoveId} id={item.id} text={getTitle(item)} />
              </Grid>
            ))}
          </Grid>
          <PaginationUI length={Number(axiosData?.headers?.['x-total-count']) || 0} />
        </>
      )}
    </SectionLoader>
  )
}
