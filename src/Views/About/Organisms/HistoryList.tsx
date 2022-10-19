import { Grid } from '@mui/material'
import { MainCard } from 'Components/Cards'
import { ConfirmationDialog } from 'Components/Dialog'
import { SectionLoader } from 'Components/Section'
import { PaginationUI } from 'Components/UI'
import { AboutPath } from 'Constants/Navigation'
import { URL_KEYS } from 'Constants/Url'
import { CenterHistory } from 'Entities/about'
import { useCenterHistory } from 'Hooks'
import moment from 'moment'
import { useCallback, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

export const HistoryList = () => {
  const navigate = useNavigate()
  const [removeId, setRemoveId] = useState<number | null>(null)
  const {
    listQuery: { data, refetch, isLoading, axiosData, isFetching },
    remove,
  } = useCenterHistory({ initList: true })
  const [searchParams] = useSearchParams()
  const _lang = searchParams.get(URL_KEYS.LANG)

  const getTitle = useCallback(
    (item: CenterHistory) => {
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
      navigate(`/${AboutPath.main}/${AboutPath.history}/edit/${id}`)
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
                <MainCard
                  onEdit={onEdit}
                  onRemove={setRemoveId}
                  id={item.id}
                  text={getTitle(item)}
                  date={moment(item.publishedDate).utc().format('DD/MM/yyyy hh:mm')}
                />
              </Grid>
            ))}
          </Grid>
          <PaginationUI length={Number(axiosData?.headers?.['x-total-count']) || 0} />
        </>
      )}
    </SectionLoader>
  )
}
