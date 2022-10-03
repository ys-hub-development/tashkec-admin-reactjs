import { ReactNode, useState } from 'react'
import { Box, Grid, Tab, Tabs } from '@mui/material'
import { formLangTab } from 'Data/app'
import { LangError } from 'Types/app'
import cn from 'classnames'

type Props = {
  render: (lang: string) => ReactNode
  error?: Partial<LangError>
}

export const FormLangTab = ({ render, error }: Props) => {
  const [ value, setValue ] = useState('Ru')

  return (
    <Grid container rowSpacing={2}>
      <Grid item xs={12}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', paddingBottom: 2 }}>
          <Tabs value={value} onChange={(event, value) => setValue(value)}>
            {
              formLangTab.map((item) => (
                <Tab className={cn({error: !!error?.[item.id]})} label={item.label} key={item.id} value={item.id} />
              ))
            }
          </Tabs>
        </Box>
      </Grid>
      <Grid item xs={12}>{render(value)}</Grid>
    </Grid>
  )
}