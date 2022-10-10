import { useCallback, useContext, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useInstitution } from 'Hooks'
import { URL_KEYS } from 'Constants/Url'
import { IStudyInKorea } from 'Entities/news'
import { InstitutionPath } from 'Constants/Navigation'
import { ConfirmationDialog } from 'Components/Dialog'
import { Grid } from '@mui/material'
import { MainCard } from 'Components/Cards'
import { useApiQuery } from 'Hooks/App/useApiQuery'
import { InstitutionContext } from 'Views/University/Context'
import { IInstitution } from 'Entities/institution'
import { useInstitutionConfig } from 'Views/University/Hooks'

export const UniversityList = () => {
  const navigate = useNavigate()
  const { type } = useContext(InstitutionContext)
  const { subPath } = useInstitutionConfig(type)
  const [ removeId, setRemoveId ] = useState<number | null>(null)
  const { remove } = useInstitution({ initList: false })

  const { data, refetch } = useApiQuery<IInstitution[]>({
    key: 'institutionByType',
    url: '/api/educations/education-type',
    params: {
      educationTypeEnum: type,
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
      navigate(`/${InstitutionPath.main}/${subPath}/edit/${id}`)
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