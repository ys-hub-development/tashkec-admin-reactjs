import { MainCard } from 'Components/Cards'
import { Grid } from '@mui/material'
import { format } from 'date-fns'
import { useCenterHistory } from 'Hooks'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { URL_KEYS } from 'Constants/Url'
import { useCallback } from 'react'
import { CenterHistory } from 'Entities/about'
import { AboutPath } from 'Constants/Navigation'

export const HistoryList = () => {
  const navigate = useNavigate()
  const { listQuery: { data, refetch }, remove } = useCenterHistory({ initList: true })
  const [ searchParams ] = useSearchParams()
  const _lang = searchParams.get(URL_KEYS.LANG)

  const getTitle = useCallback((item: CenterHistory) => {
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
    navigate(`/${AboutPath.main}/${AboutPath.history}/edit/${id}`)
  }, [ navigate ])

  const onRemove = useCallback((id: number) => {
    remove.mutate({ id: String(id), action: () => refetch() })
  }, [ refetch, remove ])

  return (
    <Grid container rowSpacing={2}>
      {
        data && data.map(item => (
          <Grid item key={item.id} xs={12}>
            <MainCard
              onEdit={onEdit}
              onRemove={onRemove}
              id={item.id} text={getTitle(item)}
              date={format(new Date(item.publishedDate), 'dd/MM/yyyy')}
            />
          </Grid>
        ))
      }
    </Grid>
  )
}