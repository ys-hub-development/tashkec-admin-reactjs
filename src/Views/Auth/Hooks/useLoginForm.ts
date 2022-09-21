import { useForm } from 'react-hook-form'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useCallback } from 'react'
import { APP } from 'Constants/App'

type Value = {
  username: string,
  password: string
}

export function useLoginForm() {

  const schema = Yup.object().shape({
    username: Yup.string().required(APP.REQUIRED_FIELD),
    password: Yup.string().required(APP.REQUIRED_FIELD),
  })

  const form = useForm<Value>({
    defaultValues: {
      username: '',
      password: '',
    },
    resolver: yupResolver(schema),
  })

  const onSubmit = useCallback((values: Value) => {
    console.log(values)
  }, [])

  return {
    form,
    onSubmit,
  }
}