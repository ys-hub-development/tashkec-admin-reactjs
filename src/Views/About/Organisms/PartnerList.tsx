import { usePartner } from 'Hooks/About/usePartner'
import { Grid } from '@mui/material'
import { APP } from 'Constants/App'
import { ConfirmationDialog } from 'Components/Dialog'
import { useCallback, useState } from 'react'
import { updateDialogEvent } from 'Models'
import { PartnerForm } from 'Views/About/Organisms/PartnerForm'
import { PaginationUI } from 'Components/UI'
import { SectionLoader } from 'Components/Section'
import { PictureItem } from 'Components/Picture'

export const PartnerList = () => {
  const [ removeId, setRemoveId ] = useState<number | null>(null)
  const { listQuery: { data, refetch, isLoading, axiosData, isFetching }, remove } = usePartner({ initList: true })

  const onRemove = useCallback(() => {
    if (removeId) {
      remove.mutate({ id: String(removeId), action: () => refetch() })
      setRemoveId(null)
    }
  }, [ refetch, remove, removeId ])

  const onEdit = useCallback((id: number) => {
    updateDialogEvent({
      open: true,
      title: APP.EDIT_PARTNER,
      content: <PartnerForm id={String(id)} />,
    })
  }, [])

  return (
    <SectionLoader isLoading={isLoading} isFetching={isFetching}>
      <ConfirmationDialog open={!!removeId} onClose={() => setRemoveId(null)} onAccept={onRemove} />
      {
        !isLoading && data && (
          <>
            <Grid container spacing={3}>
              {
                data.map((item) => (
                  <Grid item xs={2.4} key={item.id}>
                    <PictureItem
                      onEdit={onEdit}
                      className='logo'
                      id={item.id}
                      url={item.attachment.path}
                      onRemove={setRemoveId}
                    />
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