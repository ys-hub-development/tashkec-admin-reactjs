import { Box, Grid, Tab, Tabs } from '@mui/material'
import { ReactNode, useMemo } from 'react'
import { formLangTab } from 'Data/app'

type TabListType = {
  id: string,
  label: string,
}

type Props = {
  children?: ReactNode
  tabList?: TabListType[],
  onChange: (value: string) => void,
  value: string
}

export const TabUI = ({ tabList, children, onChange, value }: Props) => {

  const list = useMemo(() => {
    return tabList || formLangTab
  }, [ tabList ])

  return (
    <Grid container rowSpacing={2}>
      <Grid item xs={12}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', paddingBottom: 2 }}>
          <Tabs value={value} onChange={(event, value) => onChange(value)}>
            {
              list.map((item) => (
                <Tab label={item.label} key={item.id} value={item.id} />
              ))
            }
          </Tabs>
        </Box>
      </Grid>
      {
        children ? <Grid item xs={12}>{children}</Grid> : null
      }
    </Grid>
  )
}