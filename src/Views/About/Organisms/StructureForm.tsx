import { FormProps } from 'Types/app'
import { useStructureForm } from 'Views/About/Hooks'
import { Controller } from 'react-hook-form'
import { Fragment } from 'react'
import { TextEditorUI } from 'Components/UI'
import { formLangTab } from 'Data/app'
import { Button, Grid } from '@mui/material'
import { APP } from 'Constants/App'

type Props = FormProps

export const StructureForm = ({ lang }: Props) => {
  const { form, onSubmit } = useStructureForm()
  const { control, setValue, handleSubmit } = form

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container rowSpacing={2}>
        <Grid item xs={12}>
          {
            formLangTab.map(({ id }) => {
              const name: any = `text${id.toUpperCase()}`
              return (
                <Fragment key={id}>
                  {
                    lang === id && (
                      <Controller
                        name={name}
                        control={control}
                        render={({ field: { value }, fieldState: { error } }) => (
                          <TextEditorUI
                            value={value}
                            errorText={error?.message}
                            onChange={(value) => setValue(name, value)}
                          />
                        )}
                      />
                    )
                  }
                </Fragment>
              )
            })
          }
        </Grid>
        <Grid item xs={12}>
          <Button type='submit' size='large' fullWidth>{APP.PUBLISH}</Button>
        </Grid>
      </Grid>
    </form>
  )
}