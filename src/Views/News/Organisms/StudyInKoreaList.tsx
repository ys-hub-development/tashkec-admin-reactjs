import { Grid } from '@mui/material'
import { MainCard } from 'Components/Cards'
import { ConfirmationDialog } from 'Components/Dialog'
import { NewsPath } from 'Constants/Navigation'
import { URL_KEYS } from 'Constants/Url'
import { IStudyInKorea } from 'Entities/news'
import { useStudyInKorea } from 'Hooks'
import { useCallback, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

export const StudyInKoreaList = () => {
  const [removeId, setRemoveId] = useState<number | null>(null)
  const navigate = useNavigate()
  const {
    listQuery: { data, refetch },
    remove,
  } = useStudyInKorea({ initList: true })
  const [searchParams] = useSearchParams()
  const _lang = searchParams.get(URL_KEYS.LANG)

  const getTitle = useCallback(
    (item: IStudyInKorea) => {
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
      navigate(`/${NewsPath.main}/${NewsPath['study-in-korea']}/edit/${id}`)
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
      <ConfirmationDialog
        open={!!removeId}
        onAccept={onRemove}
        onClose={() => setRemoveId(null)}
        text={
          <>
            В этом объекте есть связанные файлы. <br /> После удаления они тоже уничтожается!
          </>
        }
      />
      <Grid container rowSpacing={2}>
        {data &&
          data.map(item => (
            <Grid item key={item.id} xs={12}>
              <MainCard onEdit={onEdit} onRemove={setRemoveId} id={item.id} text={getTitle(item)} />
            </Grid>
          ))}
      </Grid>
    </>
  )
}
