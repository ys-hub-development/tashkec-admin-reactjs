import { useForm } from 'react-hook-form'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useCallback } from 'react'
import { APP } from 'Constants/App'
import { useMutation } from '@tanstack/react-query'
import httpClient from 'Service'
import { AccountAuthData } from 'Types/account'
import { AccountAuthResponse } from 'Entities/account'
import { getAppAuthStatus } from 'Models'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'

export function useLoginForm() {
  const navigate = useNavigate()

  const mutation = useMutation(
    (data: AccountAuthData) => httpClient.post<AccountAuthResponse>('/admin/auth', data),
    {
      onSuccess: ({ data: { id_token: token } }) => {
        getAppAuthStatus(true)
        Cookies.set('token', token)
        navigate('/')
      },
    },
  )

  const schema = Yup.object().shape({
    username: Yup.string().required(APP.REQUIRED_FIELD),
    password: Yup.string().required(APP.REQUIRED_FIELD),
  })

  const form = useForm<AccountAuthData>({
    defaultValues: {
      username: '',
      password: '',
    },
    resolver: yupResolver(schema),
  })

  const onSubmit = useCallback((values: AccountAuthData) => {
    mutation.mutate(values)
  }, [ mutation ])

  return {
    form,
    onSubmit,
    mutation,
  }
}