import { useForm } from 'react-hook-form'
import { useCallback, useMemo } from 'react'
import * as yup from 'yup'
import { APP } from 'Constants/App'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import httpClient from 'Service'
import { updateDialogEvent } from 'Models'

type Values = {
  currentPassword: string,
  newPassword: string,
  confirmPassword: string
}

export function useChangePassword() {
  const update = useMutation(
    (data: Omit<Values, 'confirmPassword'>) => httpClient.post('/account/change-password', data),
    {
      onSuccess: () => {
        updateDialogEvent(null)
      },
    },
  )

  const schema = yup.object().shape({
    currentPassword: yup.string().required(APP.REQUIRED_FIELD),
    newPassword: yup.string().required(APP.REQUIRED_FIELD).min(4, APP.PASSWORD_MIN_LIMIT),
    confirmPassword: yup.string().required(APP.REQUIRED_FIELD).oneOf([ yup.ref('newPassword'), null ], APP.PASSWORD_MUST_MATCH),
  })

  const form = useForm<Values>({
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
    resolver: yupResolver(schema),
  })

  const { formState: { errors } } = form
  const onSubmit = useCallback((values: Values) => {
    update.mutate({ currentPassword: values.currentPassword, newPassword: values.newPassword })
  }, [ update ])

  const isLoading = useMemo(() => update.isLoading, [ update.isLoading ])

  const disabled = useMemo(() => (
    !!errors.currentPassword?.message ||
    !!errors.confirmPassword?.message ||
    !!errors?.newPassword
  ), [ errors ])


  return { form, onSubmit, disabled, isLoading }
}