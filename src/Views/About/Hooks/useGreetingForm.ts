import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { APP } from 'Constants/App'
import { yupResolver } from '@hookform/resolvers/yup'
import { useCallback, useEffect, useMemo } from 'react'
import { Greeting } from 'Entities/about'
import { LangError } from 'Types/app'
import { useGreeting } from 'Hooks'

type Values = Omit<Greeting, 'id'>

export function useGreetingForm() {
  const { listQuery: { data }, create, update } = useGreeting({ initList: true })
  const id = data?.length ? data[0].id : null
  const schema = yup.object().shape({
    titleKr: yup.string().required(APP.REQUIRED_FIELD),
    titleRu: yup.string().required(APP.REQUIRED_FIELD),
    titleUz: yup.string().required(APP.REQUIRED_FIELD),
    contentKr: yup.string().required(APP.REQUIRED_FIELD),
    contentRu: yup.string().required(APP.REQUIRED_FIELD),
    contentUz: yup.string().required(APP.REQUIRED_FIELD),
  })

  const form = useForm<Values>({
    defaultValues: {
      titleKr: '',
      titleUz: '',
      titleRu: '',
      contentKr: '',
      contentRu: '',
      contentUz: '',
    },
    resolver: yupResolver(schema),
  })

  const onSubmit = useCallback((values: Values) => {
    if (id) {
      update.mutate({ id: String(id), data: {...values, id} })
    } else {
      create.mutate({ data: values })
    }
  }, [ create, id, update ])

  const { formState: { errors }, setValue } = form
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const langError: Partial<LangError> = {
    Ru: !!errors.contentRu?.message || !!errors.titleRu?.message,
    Uz: !!errors.contentUz?.message || !!errors.titleUz?.message,
    Kr: !!errors.contentKr?.message || !!errors.titleKr?.message,
  }

  const disabled = useMemo(() => {
    return Object.values(langError).findIndex(item => item) !== -1
  }, [ langError ])

  const isLoading = useMemo(() => create.isLoading || update.isLoading, [ create, update ])

  useEffect(() => {
    if (id && data) {
      const d = data[0]
      setValue('contentUz', d.contentUz)
      setValue('contentRu', d.contentRu)
      setValue('contentKr', d.contentKr)
      setValue('titleUz', d.titleUz)
      setValue('titleRu', d.titleRu)
      setValue('titleKr', d.titleKr)
    }
  }, [ data, id, setValue ])

  return {
    form,
    onSubmit,
    langError,
    disabled,
    isLoading,
  }
}