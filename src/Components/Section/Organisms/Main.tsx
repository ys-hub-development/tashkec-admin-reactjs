import { Button, Grid, Stack, Typography } from '@mui/material'
import { useLayoutHeading } from 'Hooks'
import { PlusCircleFilledIcon } from 'Icons/Plus'
import { LangFilter } from '../Molecules'

type Props = {
  onAdd?: () => void
  title?: string
  addTitle?: string
  langFilter?: boolean
}

export const SectionHeading = ({ onAdd, title, addTitle, langFilter }: Props) => {
  const { contentHeading } = useLayoutHeading()

  return (
    <Grid container justifyContent='space-between' alignItems='center' rowSpacing={3}>
      <Grid item>
        <Typography variant='h4'>{title || contentHeading}</Typography>
      </Grid>
      <Grid item xs={langFilter ? 12 : undefined}>
        {langFilter ? (
          <Stack direction='row' justifyContent='space-between'>
            <LangFilter />
            {onAdd && (
              <Button startIcon={<PlusCircleFilledIcon />} onClick={onAdd}>
                {addTitle || ''}
              </Button>
            )}
          </Stack>
        ) : (
          <Stack direction='row' alignItems='center'>
            {onAdd && (
              <Button startIcon={<PlusCircleFilledIcon />} onClick={onAdd}>
                {addTitle || ''}
              </Button>
            )}
          </Stack>
        )}
      </Grid>
    </Grid>
  )
}
