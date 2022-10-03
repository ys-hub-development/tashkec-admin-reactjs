import { useCallback, useMemo } from 'react'
import { TableColumnType } from 'Types/app'
import { Grid } from '@mui/material'
import { UserCard } from 'Components/Cards'
import { TableUI } from 'Components/UI/Table'
import { useNavigate } from 'react-router-dom'
import { CommonPath, UserPath } from 'Constants/Navigation'
import { useUser } from 'Hooks'

export const UserList = () => {
  const navigate = useNavigate()
  const { listQuery: { data, refetch }, remove } = useUser({ initList: true })

  const columns = useMemo((): TableColumnType[] => [
    { title: 'Пользователь', gridSize: 2.8 },
    { title: 'Юзернейм', gridSize: 2.8 },
    { title: 'Эл.почта', gridSize: 2.8 },
    { title: 'Статус', gridSize: 2.8 },
    { title: '' },
  ], [])

  const onEdit = useCallback((id: number) => {
    navigate(`/${UserPath.main}/${CommonPath.edit}/${id}`)
  }, [ navigate ])

  const onRemove = useCallback((id: number) => {
    remove.mutate({ id: String(id), action: () => refetch() })
  }, [refetch, remove])

  return (
    <TableUI columns={columns}>
      <Grid container rowSpacing={2}>
        {
          data && data.map((item) => (
            <Grid item xs={12} key={item.id}>
              <UserCard gridSize={2.8} onEdit={onEdit} onRemove={onRemove} user={item} />
            </Grid>
          ))
        }
      </Grid>
    </TableUI>
  )
}