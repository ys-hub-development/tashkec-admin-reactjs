import { useCallback, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useTopikMaterial } from 'Hooks'
import { URL_KEYS } from 'Constants/Url'
import { ConfirmationDialog } from 'Components/Dialog'
import { Grid } from '@mui/material'
import { MainCard } from 'Components/Cards'
import { ITopikMaterial } from 'Entities/material'
import { updateDialogEvent } from 'Models'
import { APP } from 'Constants/App'
import { TopikMaterialForm } from 'Views/Materials/Organisms/TopikMaterialForm'
import { SectionLoader } from 'Components/Section'
import { PaginationUI } from 'Components/UI'

export const TopikMaterialList = () => {
  const [removeId, setRemoveId] = useState<number | null>(null)
  const {
    listQuery: { data, refetch, isFetching, isLoading, axiosData },
    remove,
  } = useTopikMaterial({ initList: true })
  const [searchParams] = useSearchParams()
  const _lang = searchParams.get(URL_KEYS.LANG)

  const getTitle = useCallback(
    (item: ITopikMaterial) => {
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

  const onEdit = useCallback((id: number) => {
    updateDialogEvent({
      title: APP.UPDATE_TOPIK_MATERIAL,
      open: true,
      content: <TopikMaterialForm id={String(id)} />,
    })
  }, [])

  const onRemove = useCallback(() => {
    if (removeId) {
      remove.mutate({ id: String(removeId), action: () => refetch() })
      setRemoveId(null)
    }
  }, [refetch, remove, removeId])

  return (
    <SectionLoader isFetching={isFetching} isLoading={isLoading}>
      <ConfirmationDialog open={!!removeId} onClose={() => setRemoveId(null)} onAccept={onRemove} />
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
