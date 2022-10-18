import { useCallback, useContext, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useCulture } from 'Hooks'
import { URL_KEYS } from 'Constants/Url'
import { CulturePath } from 'Constants/Navigation'
import { ConfirmationDialog } from 'Components/Dialog'
import { CircularProgress, Grid } from '@mui/material'
import { MainCard } from 'Components/Cards'
import { useApiQuery } from 'Hooks/App/useApiQuery'
import { CultureContext } from 'Views/Culture/Context'
import { useCultureConfig } from 'Views/Culture/Hooks'
import { ICulture } from 'Entities/culture'
import { PaginationUI } from 'Components/UI'
import { SectionLoader } from 'Components/Section'

export const CultureList = () => {
  const navigate = useNavigate()
  const { type } = useContext(CultureContext)
  const { subPath } = useCultureConfig(type)
  const [ removeId, setRemoveId ] = useState<number | null>(null)
  const { remove } = useCulture({ initList: false })

  const { data, refetch, axiosData, isLoading, isFetching } = useApiQuery<ICulture[]>({
    key: 'institutionByType',
    url: '/api/korean-cultures/type',
    params: {
      koreanCultureType: type,
    },
  })
  const [ searchParams ] = useSearchParams()
  const _lang = searchParams.get(URL_KEYS.LANG)

  const getTitle = useCallback(
    (item: ICulture) => {
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
      navigate(`/${CulturePath.main}/${subPath}/edit/${id}`)
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
      <SectionLoader isLoading={isLoading} isFetching={isFetching}>
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
    </>
  )
}