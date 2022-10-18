import { useCallback, useState } from 'react'
import { useAttachments, useCultureAttachments } from 'Hooks'
import { useSearchParams } from 'react-router-dom'
import { URL_KEYS } from 'Constants/Url'
import { IAttachmentBase } from 'Entities/attachment'
import { updateDialogEvent } from 'Models'
import { APP } from 'Constants/App'
import { ConfirmationDialog } from 'Components/Dialog'
import { Grid } from '@mui/material'
import { MainCard } from 'Components/Cards'
import { CultureFileForm } from './CultureFileForm'
import { SectionLoader } from 'Components/Section'

type Props = {
  id: string
}

export const CultureFileList = ({ id }: Props) => {
  const [removeId, setRemoveId] = useState<number | null>(null)
  const {
    listQuery: { data, refetch, isFetching, isLoading },
  } = useCultureAttachments({ initList: true, extraId: id })
  const { remove } = useAttachments({ initList: false })
  const [searchParams] = useSearchParams()
  const _lang = searchParams.get(URL_KEYS.LANG)

  const getTitle = useCallback(
    (item: IAttachmentBase) => {
      switch (_lang) {
        case 'Ru':
          return item.fileNameRu
        case 'Uz':
          return item.fileNameUz
        case 'Kr':
          return item.fileNameKr
        default:
          return item.fileNameRu
      }
    },
    [_lang],
  )

  const onEdit = useCallback(
    (detailId: number) => {
      updateDialogEvent({
        title: APP.EDIT_DOCUMENT,
        open: true,
        content: <CultureFileForm id={id} detailId={String(detailId)} />,
      })
    },
    [id],
  )

  const onRemove = useCallback(() => {
    if (removeId) {
      remove.mutate({ id: String(removeId), action: () => refetch() })
      setRemoveId(null)
    }
  }, [refetch, remove, removeId])

  return (
    <SectionLoader isFetching={isFetching} isLoading={isLoading}>
      <ConfirmationDialog open={!!removeId} onAccept={onRemove} onClose={() => setRemoveId(null)} />
      {!isLoading && data && (
        <Grid container rowSpacing={2}>
          {data.map(item => (
            <Grid item key={item.id} xs={12}>
              <MainCard onEdit={onEdit} onRemove={setRemoveId} id={item.id} text={getTitle(item)} />
            </Grid>
          ))}
        </Grid>
      )}
    </SectionLoader>
  )
}
