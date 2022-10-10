import { Grid } from '@mui/material'
import { MainCard } from 'Components/Cards'
import { ConfirmationDialog } from 'Components/Dialog'
import { NewsPath } from 'Constants/Navigation'
import { URL_KEYS } from 'Constants/Url'
import { format } from 'date-fns'
import { IEvents } from 'Entities/news'
import { useEvents } from 'Hooks'
import { useCallback, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

export const EventsList = () => {
  const [removeId, setRemoveId] = useState<number | null>(null)
  const navigate = useNavigate()
  const {
    listQuery: { data, refetch },
    remove,
  } = useEvents({ initList: true })
  const [searchParams] = useSearchParams()
  const _lang = searchParams.get(URL_KEYS.LANG)

  const getTitle = useCallback(
    (item: IEvents) => {
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
      navigate(`/${NewsPath.main}/${NewsPath['center-events']}/edit/${id}`)
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
    <>
      <ConfirmationDialog open={!!removeId} onClose={() => setRemoveId(null)} onAccept={onRemove} />
      <Grid container rowSpacing={2}>
        {data &&
          data.map(item => (
            <Grid item key={item.id} xs={12}>
              <MainCard
                onEdit={onEdit}
                onRemove={setRemoveId}
                id={item.id}
                text={getTitle(item)}
                date={format(new Date(item.publishedDate), 'dd/MM/yyyy hh:mm')}
              />
            </Grid>
          ))}
      </Grid>
    </>
  )
}
