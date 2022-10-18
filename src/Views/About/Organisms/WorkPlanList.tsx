import { useWorkPlan } from 'Hooks'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { URL_KEYS } from 'Constants/Url'
import { useCallback, useState } from 'react'
import { WorkPlan } from 'Entities/about'
import { Grid } from '@mui/material'
import { MainCard } from 'Components/Cards'
import { AboutPath } from 'Constants/Navigation'
import { ConfirmationDialog } from 'Components/Dialog'
import { PaginationUI } from 'Components/UI'
import { SectionLoader } from 'Components/Section'

export const WorkPlanList = () => {
  const navigate = useNavigate()
  const { listQuery: { data, refetch, isLoading, axiosData, isFetching }, remove } = useWorkPlan({ initList: true })
  const [ searchParams ] = useSearchParams()
  const _lang = searchParams.get(URL_KEYS.LANG)
  const [ removeId, setRemoveId ] = useState<number | null>(null)

  const getTitle = useCallback((item: WorkPlan) => {
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
  }, [ _lang ])

  const onEdit = useCallback((id: number) => {
    navigate(`/${AboutPath.main}/${AboutPath.plan}/edit/${id}`)

  }, [ navigate ])

  const onRemove = useCallback(() => {
    if (removeId) {
      remove.mutate({ id: String(removeId), action: () => refetch() })
      setRemoveId(null)
    }
  }, [ refetch, remove, removeId ])

  return (
    <SectionLoader isLoading={isLoading} isFetching={isFetching}>
      <ConfirmationDialog open={!!removeId} onClose={() => setRemoveId(null)} onAccept={onRemove} />

      {
        !isLoading && data && (
          <>
            <Grid container rowSpacing={2}>
              {
                data.map(item => (
                  <Grid item key={item.id} xs={12}>
                    <MainCard
                      onEdit={onEdit}
                      onRemove={setRemoveId}
                      id={item.id} text={getTitle(item)}
                    />
                  </Grid>
                ))
              }
            </Grid>
            <PaginationUI length={Number(axiosData?.headers?.['x-total-count']) || 0} />
          </>
        )
      }
    </SectionLoader>
  )
}