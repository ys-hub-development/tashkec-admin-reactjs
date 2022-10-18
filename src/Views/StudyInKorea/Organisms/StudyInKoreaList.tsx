import { Grid } from '@mui/material'
import { MainCard } from 'Components/Cards'
import { ConfirmationDialog } from 'Components/Dialog'
import { StudyPath } from 'Constants/Navigation'
import { URL_KEYS } from 'Constants/Url'
import { IStudyInKorea } from 'Entities/news'
import { useApiQuery, useStudyInKorea } from 'Hooks'
import { useCallback, useContext, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { StudyInKoreaContext } from 'Views/StudyInKorea/Context'
import { useStudyInKoreaConfig } from 'Views/StudyInKorea/Hooks'
import { PaginationUI } from 'Components/UI'
import { SectionLoader } from 'Components/Section'

export const StudyInKoreaList = () => {
  const { type } = useContext(StudyInKoreaContext)
  const { subPath } = useStudyInKoreaConfig(type)
  const [ removeId, setRemoveId ] = useState<number | null>(null)
  const navigate = useNavigate()
  const { remove } = useStudyInKorea({ initList: false })
  const { data, refetch, axiosData, isLoading, isFetching } = useApiQuery<IStudyInKorea[]>({
    key: 'institutionByType',
    url: '/api/study-in-koreas',
    params: {
      studyTypeEnum: type,
    },
  })
  const [ searchParams ] = useSearchParams()
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
    [ _lang ],
  )

  const onEdit = useCallback(
    (id: number) => {
      navigate(`/${StudyPath.main}/${subPath}/edit/${id}`)
    },
    [ navigate, subPath ],
  )

  const onRemove = useCallback(() => {
    if (removeId) {
      remove.mutate({ id: String(removeId), action: () => refetch() })
      setRemoveId(null)
    }
  }, [ refetch, remove, removeId ])

  return (
    <SectionLoader isLoading={isLoading} isFetching={isFetching}>
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
      {
        !isLoading && data && (
          <>
            <Grid container rowSpacing={2}>
              {
                data.map(item => (
                  <Grid item key={item.id} xs={12}>
                    <MainCard onEdit={onEdit} onRemove={setRemoveId} id={item.id} text={getTitle(item)} />
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
