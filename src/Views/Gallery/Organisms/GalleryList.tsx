import { Grid } from '@mui/material'
import { useGallery } from 'Hooks'
import { PictureItem } from 'Components/Picture'
import { useCallback, useState } from 'react'
import { ConfirmationDialog } from 'Components/Dialog'
import { useNavigate } from 'react-router-dom'
import { CommonPath, GalleryPath } from 'Constants/Navigation'
import { SectionLoader } from 'Components/Section'
import { PaginationUI } from 'Components/UI'
import { NO_IMAGE_URL } from 'Constants/App'

export const GalleryList = () => {
  const navigate = useNavigate()
  const {
    listQuery: { data, refetch, isFetching, isLoading, axiosData },
    remove,
  } = useGallery({ initList: true })
  const [removeId, setRemoveId] = useState<number | null>(null)

  const onRemove = useCallback(() => {
    if (removeId) {
      remove.mutate({ id: String(removeId), action: () => refetch() })
      setRemoveId(null)
    }
  }, [refetch, remove, removeId])

  const getRemoveLoading = useCallback(
    (id: number) => {
      return remove.variables?.id === String(id) && (remove.isLoading || isFetching)
    },
    [remove.isLoading, isFetching, remove.variables?.id],
  )

  const onEdit = useCallback(
    (id: number) => {
      navigate(`/${GalleryPath.main}/${CommonPath.edit}/${id}`)
    },
    [navigate],
  )

  return (
    <SectionLoader isFetching={isFetching} isLoading={isLoading}>
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
      {!isLoading && data && (
        <>
          <Grid container spacing={3}>
            {data.map(item => (
              <Grid item xl={2.4} xs={3} key={item.id}>
                <PictureItem
                  id={item.id}
                  className='banner'
                  url={item.mainPhotoUrl || NO_IMAGE_URL}
                  onRemove={setRemoveId}
                  onEdit={onEdit}
                  isLoading={getRemoveLoading(item.id)}
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
