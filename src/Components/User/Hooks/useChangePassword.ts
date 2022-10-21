import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { APP } from 'Constants/App'
import { updateDialogEvent } from 'Models'
import { useCallback, useEffect, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import httpClient from 'Service'
import * as yup from 'yup'

type Values = {
  currentPassword: string
  newPassword: string
  repeatNewPassword: string
}

type Props = {
  userId?: string
}

export function useChangePassword({ userId }: Props) {
  const updateAccount = useMutation((data: Omit<Values, 'repeatNewPassword'>) => httpClient.post('/account/change-password', data), {
    onSuccess: () => {
      updateDialogEvent(null)
      toast.success(APP.PASSWORD_SUCCESSFULLY_CHANGED)
    },
  })

  const updateUser = useMutation(
    (data: Omit<Values, 'currentPassword'>) => httpClient.post('/admin/change-password', { ...data, id: userId }),
    {
      onSuccess: () => {
        updateDialogEvent(null)
        toast.success(APP.PASSWORD_SUCCESSFULLY_CHANGED)
      },
    },
  )

  const schema = yup.object().shape({
    currentPassword: yup.string().required(APP.REQUIRED_FIELD),
    newPassword: yup.string().required(APP.REQUIRED_FIELD).min(4, APP.PASSWORD_MIN_LIMIT),
    repeatNewPassword: yup
      .string()
      .required(APP.REQUIRED_FIELD)
      .oneOf([yup.ref('newPassword'), null], APP.PASSWORD_MUST_MATCH),
  })

  const form = useForm<Values>({
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      repeatNewPassword: '',
    },
    resolver: yupResolver(schema),
  })

  const {
    formState: { errors },
    setValue,
  } = form
  const onSubmit = useCallback(
    (values: Values) => {
      if (userId) {
        updateUser.mutate({ repeatNewPassword: values.repeatNewPassword, newPassword: values.newPassword })
      } else {
        updateAccount.mutate({ currentPassword: values.currentPassword, newPassword: values.newPassword })
      }
    },
    [updateAccount, updateUser, userId],
  )

  const isLoading = useMemo(() => updateAccount.isLoading || updateUser.isLoading, [updateAccount.isLoading, updateUser.isLoading])

  const disabled = useMemo(
    () => !!errors.currentPassword?.message || !!errors.repeatNewPassword?.message || !!errors?.newPassword,
    [errors],
  )

  useEffect(() => {
    if (userId) {
      setValue('currentPassword', '123')
    }
  }, [userId, setValue])

  console.log(errors)

  return { form, onSubmit, disabled, isLoading }
}
