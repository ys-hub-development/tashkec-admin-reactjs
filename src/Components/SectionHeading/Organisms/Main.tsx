import { Button, Grid, Stack, Typography } from '@mui/material'
import { useLayoutHeading } from 'Hooks'
import { PlusCircleFilledIcon } from 'Icons/Plus'

type Props = {
  onAdd?: () => void
  title?: string
  addTitle?: string
}

export const SectionHeading = ({ onAdd, title, addTitle }: Props) => {
  const { contentHeading } = useLayoutHeading()

  return (
    <Grid container justifyContent='space-between' alignItems='center'>
      <Grid item>
        <Typography variant='h4'>{title || contentHeading}</Typography>
      </Grid>
      <Grid item>
        <Stack direction='row' alignItems='center'>
          {
            onAdd && (
              <Button startIcon={<PlusCircleFilledIcon />} onClick={onAdd}>
                {addTitle || ''}
              </Button>
            )
          }
        </Stack>
      </Grid>
    </Grid>
  )
}