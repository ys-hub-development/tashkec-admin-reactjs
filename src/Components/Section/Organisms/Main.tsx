import { Button, Grid, Stack, Typography } from '@mui/material'
import { useLayoutHeading } from 'Hooks'
import { PlusCircleFilledIcon } from 'Icons/Plus'
import { ReactNode } from 'react'
import { LangFilter } from '../Molecules'

type Props = {
  onAdd?: () => void
  title?: string
  addTitle?: string
  langFilter?: boolean
  filter?: ReactNode
}

export const SectionHeading = ({ onAdd, title, addTitle, langFilter, filter }: Props) => {
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
            {(onAdd || filter) && (
              <Stack direction='row' alignItems='center' spacing={2}>
                {filter || null}
                {onAdd && (
                  <Button startIcon={<PlusCircleFilledIcon />} onClick={onAdd}>
                    {addTitle || ''}
                  </Button>
                )}
              </Stack>
            )}
          </Stack>
        ) : (
          <Stack direction='row' alignItems='center' spacing={2}>
            {filter || null}
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
