import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { APP } from 'Constants/App'
import { yupResolver } from '@hookform/resolvers/yup'
import { useCallback } from 'react'

type Values = {
  textUZ: string
  textRU: string,
  textKO: string
}

export function useStructureForm() {
  const schema = yup.object().shape({
    textUZ: yup.string().required(APP.REQUIRED_FIELD),
    textRU: yup.string().required(APP.REQUIRED_FIELD),
    textKO: yup.string().required(APP.REQUIRED_FIELD)
  })

  const form = useForm<Values>({
    defaultValues: {textKO: '', textRU: '', textUZ: ''},
    resolver: yupResolver(schema)
  })

  const onSubmit = useCallback((values: Values) => {
    console.log(values)
  }, [])

  return {
    form,
    onSubmit
  }
}