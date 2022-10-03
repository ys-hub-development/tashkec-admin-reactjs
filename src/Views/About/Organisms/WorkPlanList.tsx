import { useWorkPlan } from 'Hooks'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { URL_KEYS } from 'Constants/Url'
import { useCallback } from 'react'
import { WorkPlan } from 'Entities/about'
import { Grid } from '@mui/material'
import { MainCard } from 'Components/Cards'
import { AboutPath } from 'Constants/Navigation'

export const WorkPlanList = () => {
  const navigate = useNavigate()
  const { listQuery: { data, refetch }, remove } = useWorkPlan({ initList: true })
  const [ searchParams ] = useSearchParams()
  const _lang = searchParams.get(URL_KEYS.LANG)

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

  const onRemove = useCallback((id: number) => {
    remove.mutate({ id: String(id), action: () => refetch() })
  }, [refetch, remove])

  return (
    <Grid container rowSpacing={2}>
      {
        data && data.map(item => (
          <Grid item key={item.id} xs={12}>
            <MainCard
              onEdit={onEdit}
              onRemove={onRemove}
              id={item.id} text={getTitle(item)}
            />
          </Grid>
        ))
      }
    </Grid>
  )
}