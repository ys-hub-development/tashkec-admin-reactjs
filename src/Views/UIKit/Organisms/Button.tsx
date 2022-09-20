import { Button, ButtonProps, Grid, Typography } from '@mui/material'
import { useCallback } from 'react'
import { PlusCircleFilledIcon } from 'Icons/Plus'

export const ButtonKit = () => {
  const common = useCallback((icon?: boolean): ButtonProps => {
    return {
      fullWidth: true,
      startIcon: icon ? <PlusCircleFilledIcon /> : undefined,
    }
  }, [])

  return (
    <Grid container spacing={4}>
      <Grid item xs={12}>
        <Typography variant='h3' marginBottom={2}>
          Primary
        </Typography>
        <Grid container spacing={2}>
          <Grid item xl={1.5} lg={3}>
            <Button {...common()} variant='contained'>
              Опубликовать
            </Button>
          </Grid>
          <Grid item xl={1.5} lg={3}>
            <Button {...common()} variant='contained' className='light'>
              Опубликовать
            </Button>
          </Grid>
          <Grid item xl={1.5} lg={3}>
            <Button {...common()} variant='outlined'>
              Опубликовать
            </Button>
          </Grid>
          <Grid item xl={1.5} lg={3}>
            <Button {...common()} variant='outlined' className='filled'>
              Опубликовать
            </Button>
          </Grid>
          <Grid item xl={1.5} lg={3}>
            <Button {...common()} variant='text'>
              Опубликовать
            </Button>
          </Grid>
          <Grid item xl={1.5} lg={3}>
            <Button {...common()} disabled variant='contained'>
              Опубликовать
            </Button>
          </Grid>
          <Grid item xl={1.5} lg={3}>
            <Button disabled {...common()} variant='outlined'>
              Опубликовать
            </Button>
          </Grid>
          <Grid item xl={1.5} lg={3}>
            <Button disabled {...common()} variant='text'>
              Опубликовать
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Typography variant='h3' marginBottom={2}>
          Secondary
        </Typography>
        <Grid container spacing={2}>
          <Grid item xl={1.5} lg={3}>
            <Button {...common()} color='secondary' variant='contained'>
              Опубликовать
            </Button>
          </Grid>
          <Grid item xl={1.5} lg={3}>
            <Button {...common()} color='secondary' variant='contained' className='light'>
              Опубликовать
            </Button>
          </Grid>
          <Grid item xl={1.5} lg={3}>
            <Button {...common()} color='secondary' variant='outlined'>
              Опубликовать
            </Button>
          </Grid>
          <Grid item xl={1.5} lg={3}>
            <Button {...common()} color='secondary' variant='outlined' className='filled'>
              Опубликовать
            </Button>
          </Grid>
          <Grid item xl={1.5} lg={3}>
            <Button {...common()} color='secondary' variant='text'>
              Опубликовать
            </Button>
          </Grid>
          <Grid item xl={1.5} lg={3}>
            <Button {...common()} color='secondary' disabled variant='contained'>
              Опубликовать
            </Button>
          </Grid>
          <Grid item xl={1.5} lg={3}>
            <Button disabled color='secondary' {...common()} variant='outlined'>
              Опубликовать
            </Button>
          </Grid>
          <Grid item xl={1.5} lg={3}>
            <Button disabled color='secondary' {...common()} variant='text'>
              Опубликовать
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Typography variant='h3' marginBottom={2}>
          Error
        </Typography>
        <Grid container spacing={2}>
          <Grid item xl={1.5} lg={3}>
            <Button {...common()} color='error' variant='contained'>
              Опубликовать
            </Button>
          </Grid>
          <Grid item xl={1.5} lg={3}>
            <Button {...common()} color='error' variant='contained' className='light'>
              Опубликовать
            </Button>
          </Grid>
          <Grid item xl={1.5} lg={3}>
            <Button {...common()} color='error' variant='outlined'>
              Опубликовать
            </Button>
          </Grid>
          <Grid item xl={1.5} lg={3}>
            <Button {...common()} color='error' variant='outlined' className='filled'>
              Опубликовать
            </Button>
          </Grid>
          <Grid item xl={1.5} lg={3}>
            <Button {...common()} color='error' variant='text'>
              Опубликовать
            </Button>
          </Grid>
          <Grid item xl={1.5} lg={3}>
            <Button {...common()} color='error' disabled variant='contained'>
              Опубликовать
            </Button>
          </Grid>
          <Grid item xl={1.5} lg={3}>
            <Button disabled color='error' {...common()} variant='outlined'>
              Опубликовать
            </Button>
          </Grid>
          <Grid item xl={1.5} lg={3}>
            <Button disabled color='error' {...common()} variant='text'>
              Опубликовать
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}
