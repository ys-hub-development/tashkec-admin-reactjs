import { useForm } from 'react-hook-form'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { ControllerHookProps } from 'Types/app'
import { useMutation } from '@tanstack/react-query'
import httpClient from 'Service'
import { UserBasic } from 'Entities/account'
import { useNavigate } from 'react-router-dom'
import { UserPath } from 'Constants/Navigation'
import { UserData } from 'Types/account'
import { useUser } from 'Hooks'
import { Response } from 'Types/api'
import * as yup from 'yup'
import { APP } from 'Constants/App'
import { isValidPhoneNumber } from 'libphonenumber-js'
import { yupResolver } from '@hookform/resolvers/yup'

type Props = ControllerHookProps & {
  type: 'user' | 'account'
}

export function useUserForm(props: Props) {
  const navigate = useNavigate()
  const { detailId, type } = props
  const { detailQuery: { data, refetch } } = useUser({ initList: false, detailId })
  const [ photo, setPhoto ] = useState<File | null>(null)

  const update = useMutation(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    (data: Omit<UserBasic, 'logoUrl'>) => httpClient.patch<Response<UserBasic>>('/account/update', data),
    {
      onSuccess: () => {
        if (type === 'user') {
          navigate(`/${UserPath.main}`)
        }
      },
    },
  )

  const removeUpload = useMutation(
    (id: string) => httpClient.delete(`/account/logo/${id}`),
    {
      onSuccess: () => {
        if (detailId) {
          refetch()
        }
      },
    },
  )

  const upload = useMutation(
    (data: FormData) => httpClient.post<Response<UserBasic>>(
      '/account/user-logo', data,
      { headers: { 'Content-Type': 'multipart/form-data' } }),
    {
      onSuccess: () => {
        if (detailId) {
          refetch()
        }
      },
    },
  )

  const create = useMutation(
    ({ password, login, email }: UserData) => httpClient.post<Response<UserBasic>>('/admin/register', {
      password,
      login,
      email,
    }),
    {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      onSuccess: ({ data: { object: data } }, { password, ...d }) => {
        update.mutate({ ...data, ...d })
        if (photo) {
          const formData = new FormData()
          formData.append('file', photo)
          formData.append('UserId', String(data.id))
          upload.mutate(formData)
        }
      },
    },
  )

  const schema = yup.object().shape({
    firstName: yup.string().required(APP.REQUIRED_FIELD),
    lastName: yup.string().required(APP.REQUIRED_FIELD),
    email: yup.string().email(APP.VALID_EMAIL).required(APP.REQUIRED_FIELD),
    login: yup.string().required(APP.REQUIRED_FIELD),
    phoneNumber: yup.string().required(APP.REQUIRED_FIELD).test('phoneTest', APP.ERROR_PHONE_NUMBER, (value: any) => {
      if (value) {
        return isValidPhoneNumber(value, 'UZ')
      }
      return true
    }),
    password: yup.string().required(APP.REQUIRED_FIELD).min(4, APP.PASSWORD_MIN_LIMIT),
  })

  const form = useForm<UserData>({
    defaultValues: {
      phoneNumber: '',
      superUser: false,
      activated: true,
      firstName: '',
      lastName: '',
      email: '',
      login: '',
      password: '',
    },
    resolver: yupResolver(schema),
  })

  const onSubmit = useCallback(({ phoneNumber, password, ...values }: UserData) => {
    if (detailId && data) {
      update.mutate({
        id: Number(detailId),
        phoneNumber: phoneNumber ? phoneNumber?.replaceAll(' ', '') : '',
        ...values,
        authorities: data.authorities,
      })

    } else {
      create.mutate({
        phoneNumber: phoneNumber ? phoneNumber?.replaceAll(' ', '') : '',
        ...values,
        password,
      })
    }
  }, [ create, data, detailId, update ])

  const onUploadPhoto = useCallback((file: File | null) => {
    if (file) {
      if (detailId) {
        const formData = new FormData()
        formData.append('file', file)
        formData.append('UserId', detailId)
        upload.mutate(formData)
      } else {
        setPhoto(file)
      }
    }
  }, [ detailId, upload ])

  const onRemovePhoto = useCallback(() => {
    if (detailId) {
      removeUpload.mutate(detailId)
    }
    setPhoto(null)
  }, [ detailId, removeUpload ])

  const { setValue, formState: { errors } } = form
  useEffect(() => {
    if (data && detailId) {
      setValue('firstName', data.firstName || '')
      setValue('lastName', data.lastName || '')
      setValue('email', data.email || '')
      setValue('login', data.login)
      setValue('superUser', data.superUser)
      setValue('activated', data.activated)
      setValue('phoneNumber', data.phoneNumber || '')
      setValue('logoUrl', data.logoUrl)
      setValue('password', '******')
    }
  }, [ data, setValue, detailId ])

  const isLoading = useMemo(() => create.isLoading || update.isLoading, [ create.isLoading, update.isLoading ])
  const disabled = useMemo(() => (
    !!errors.login?.message ||
    !!errors.firstName?.message ||
    !!errors.lastName?.message ||
    !!errors.password?.message ||
    !!errors.phoneNumber?.message ||
    !!errors.email?.message
  ), [ errors ])

  return { form, onSubmit, onRemovePhoto, onUploadPhoto, isLoading, disabled }
}