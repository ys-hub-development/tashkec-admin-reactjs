import { useCallback, useState } from 'react'
import { useStudyMaterial } from 'Hooks'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { URL_KEYS } from 'Constants/Url'
import { IStudyMaterial } from 'Entities/material'
import { ConfirmationDialog } from 'Components/Dialog'
import { Grid } from '@mui/material'
import { MainCard } from 'Components/Cards'
import { MaterialPath } from 'Constants/Navigation'
import { SectionLoader } from 'Components/Section'
import { PaginationUI } from 'Components/UI'

export const StudyMaterialList = () => {
  const navigate = useNavigate()
  const [removeId, setRemoveId] = useState<number | null>(null)
  const {
    listQuery: { data, refetch, isFetching, isLoading, axiosData },
    remove,
  } = useStudyMaterial({ initList: true })
  const [searchParams] = useSearchParams()
  const _lang = searchParams.get(URL_KEYS.LANG)

  const getTitle = useCallback(
    (item: IStudyMaterial) => {
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
      navigate(`/${MaterialPath.main}/${MaterialPath['study-material']}/edit/${id}`)
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
      <ConfirmationDialog
        open={!!removeId}
        onClose={() => setRemoveId(null)}
        onAccept={onRemove}
        text={
          <>
            В этом объекте есть связанные файлы. <br /> После удаления они тоже уничтожается!
          </>
        }
      />
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
