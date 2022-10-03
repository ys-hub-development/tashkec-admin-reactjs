import { CardWrapper } from '../Atoms'
import { Avatar, Grid, Stack, Typography } from '@mui/material'
import { UserBasic } from 'Entities/account'
import { ContextMenu } from 'Components/Cards/Molecules'
import { GridSize } from '@mui/material/Grid/Grid'
import cn from 'classnames'
import { APP } from 'Constants/App'

type Props = {
  user: UserBasic
  onEdit: (id: number) => void,
  onRemove: (id: number) => void,
  gridSize?: boolean | GridSize;
}

export const UserCard = ({ user, gridSize, ...props }: Props) => {
  const contextProps = { id: user.id, ...props }
  return (
    <CardWrapper>
      <Grid container flexWrap='nowrap' columnSpacing={2} alignItems='center'>
        <Grid item xs={gridSize}>
          <Stack direction='row' alignItems='center' spacing={1}>
            <Avatar sx={{width: 48, height: 48}} src={user?.logoUrl || undefined} />
            <Typography variant='body1'>{`${user.firstName || ''} ${user.lastName || ''}`}</Typography>
          </Stack>
        </Grid>
        <Grid item xs={gridSize}>
          <Typography variant='body1'>{user.login}</Typography>
        </Grid>
        <Grid item xs={gridSize}>
          <Typography variant='body1'>{user.email}</Typography>
        </Grid>
        <Grid item xs={gridSize}>
          <div className={cn('badge', { 'badge-primary': user.activated, 'badge-danger': !user.activated })}>
            {user.activated ? APP.ACTIVATED_USER : APP.NOT_ACTIVATED_USER}
          </div>
        </Grid>
        <Grid item flexGrow={1} display='flex' justifyContent='flex-end'>
          <ContextMenu {...contextProps} />
        </Grid>
      </Grid>
    </CardWrapper>
  )
}