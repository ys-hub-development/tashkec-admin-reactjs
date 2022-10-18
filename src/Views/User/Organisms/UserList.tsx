import { useCallback, useMemo, useState } from 'react'
import { TableColumnType } from 'Types/app'
import { Grid } from '@mui/material'
import { UserCard } from 'Components/Cards'
import { TableUI } from 'Components/UI/Table'
import { useNavigate } from 'react-router-dom'
import { CommonPath, UserPath } from 'Constants/Navigation'
import { useUser } from 'Hooks'
import { ConfirmationDialog } from 'Components/Dialog'
import { PaginationUI } from 'Components/UI'
import { SectionLoader } from 'Components/Section'

export const UserList = () => {
  const navigate = useNavigate()
  const [removeId, setRemoveId] = useState<number | null>(null)
  const {
    listQuery: { data, refetch, isLoading, axiosData, isFetching },
    remove,
  } = useUser({ initList: true })

  const columns = useMemo(
    (): TableColumnType[] => [
      { title: 'Пользователь', gridSize: 2.8 },
      { title: 'Юзернейм', gridSize: 2.8 },
      { title: 'Эл.почта', gridSize: 2.8 },
      { title: 'Статус', gridSize: 2.8 },
      { title: '' },
    ],
    [],
  )

  const onEdit = useCallback(
    (id: number) => {
      navigate(`/${UserPath.main}/${CommonPath.edit}/${id}`)
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
      {!isLoading && data && (
        <>
          <TableUI columns={columns}>
            <Grid container rowSpacing={2}>
              {data.map(item => (
                <Grid item xs={12} key={item.id}>
                  <UserCard gridSize={2.8} onEdit={onEdit} onRemove={setRemoveId} user={item} />
                </Grid>
              ))}
            </Grid>
          </TableUI>
          <PaginationUI length={Number(axiosData?.headers?.['x-total-count']) || 0} />
        </>
      )}
    </SectionLoader>
  )
}
