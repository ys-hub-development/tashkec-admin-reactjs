import { Button, Grid, Stack, Typography } from '@mui/material'
import { useLayoutHeading } from 'Hooks'
import { PlusCircleFilledIcon } from 'Icons/Plus'
import { APP } from 'Constants/App'

type Props = {
  onAdd?: () => void
}

export const SectionHeading = ({ onAdd }: Props) => {
  const { contentHeading } = useLayoutHeading()

  return (
    <Grid container justifyContent='space-between' alignItems='center'>
      <Grid item>
        <Typography variant='h4'>{contentHeading}</Typography>
      </Grid>
      <Grid item>
        <Stack direction='row' alignItems='center'>
          {
            onAdd && (
              <Button startIcon={<PlusCircleFilledIcon />} onClick={onAdd}>
                {APP.ADD_USER}
              </Button>
            )
          }
        </Stack>
      </Grid>
    </Grid>
  )
}