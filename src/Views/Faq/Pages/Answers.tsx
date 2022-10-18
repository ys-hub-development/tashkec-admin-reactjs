import { useNavigate } from 'react-router-dom'
import { useCallback } from 'react'
import { CommonPath, FaqPath } from 'Constants/Navigation'
import { Grid } from '@mui/material'
import { SectionHeading } from 'Components/Section'
import { APP } from 'Constants/App'
import { AnswerList } from '../Organisms'

export default () => {
  const navigate = useNavigate()

  const onAdd = useCallback(() => {
    navigate(`/${FaqPath.main}/${FaqPath.answers}/${CommonPath.add}`)
  }, [navigate])

  return (
    <Grid container rowSpacing={4}>
      <Grid item xs={12}>
        <SectionHeading onAdd={onAdd} addTitle={APP.ADD_ANSWER} langFilter />
      </Grid>
      <Grid item xs={12}>
        <AnswerList />
      </Grid>
    </Grid>
  )
}
