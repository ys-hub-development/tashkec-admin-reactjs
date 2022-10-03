import { Box, Grid, Stack } from '@mui/material'
import { StyledTheadItem } from 'Components/UI/Table/style'
import { TableColumnType } from 'Types/app'
import { ReactNode } from 'react'

type Props = {
  columns?: TableColumnType[],
  children: ReactNode
}

export function TableUI({ columns, children }: Props) {

  return (
    <Stack spacing={0.2}>
      <Box pr={2} pl={2}>
        {
          columns && columns.length > 0 && (
            <Grid container columnSpacing={2}>
              {
                columns.map((item, idx) => (
                  <Grid item key={idx} xs={item.gridSize}>
                    <StyledTheadItem>
                      {item.title}
                    </StyledTheadItem>
                  </Grid>
                ))
              }
            </Grid>
          )
        }
      </Box>
      {children}
    </Stack>
  )
}