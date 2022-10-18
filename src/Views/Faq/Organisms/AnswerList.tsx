import { useCallback, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useAnswer } from 'Hooks'
import { URL_KEYS } from 'Constants/Url'
import { NewsPath } from 'Constants/Navigation'
import { ConfirmationDialog } from 'Components/Dialog'
import { Grid } from '@mui/material'
import { MainCard } from 'Components/Cards'
import { IAnswer } from 'Entities/faq'
import { SectionLoader } from 'Components/Section'
import { PaginationUI } from 'Components/UI'

export const AnswerList = () => {
  const [removeId, setRemoveId] = useState<number | null>(null)
  const navigate = useNavigate()
  const {
    listQuery: { data, refetch, isFetching, isLoading, axiosData },
    remove,
  } = useAnswer({ initList: true })
  const [searchParams] = useSearchParams()
  const _lang = searchParams.get(URL_KEYS.LANG)

  const getTitle = useCallback(
    (item: IAnswer) => {
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
      navigate(`/${NewsPath.main}/${NewsPath['center-news']}/edit/${id}`)
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
    <SectionLoader isFetching={isFetching} isLoading={isLoading}>
      <ConfirmationDialog open={!!removeId} onClose={() => setRemoveId(null)} onAccept={onRemove} />
      {data && !isLoading && (
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
