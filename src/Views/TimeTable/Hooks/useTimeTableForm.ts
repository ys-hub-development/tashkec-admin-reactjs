import { yupResolver } from '@hookform/resolvers/yup'
import { APP } from 'Constants/App'
import { ITimeTable } from 'Entities/about'
import { useTimeTable } from 'Hooks'
import { useCallback, useEffect, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { LangError } from 'Types/app'
import * as yup from 'yup'

type Values = Omit<ITimeTable, 'id'>

export function useTimeaTableForm() {
  const {
    listQuery: { data },
    create,
    update,
  } = useTimeTable({ initList: true })
  const id = data?.length ? data[0].id : null

  const schema = yup.object().shape({
    titleKr: yup.string().required(APP.REQUIRED_FIELD),
    titleRu: yup.string().required(APP.REQUIRED_FIELD),
    titleUz: yup.string().required(APP.REQUIRED_FIELD),
    contentKr: yup.string().required(APP.REQUIRED_FIELD),
    contentRu: yup.string().required(APP.REQUIRED_FIELD),
    contentUz: yup.string().required(APP.REQUIRED_FIELD),
    publishedDate: yup.string().required(APP.REQUIRED_FIELD),
  })

  const form = useForm<Values>({
    defaultValues: {
      titleKr: '',
      titleUz: '',
      titleRu: '',
      contentKr: '',
      contentRu: '',
      contentUz: '',
      publishedDate: '',
    },
    resolver: yupResolver(schema),
  })

  const onSubmit = useCallback(
    (values: Values) => {
      if (id) {
        update.mutate({
          id: String(id),
          data: { ...values, id: Number(id), publishedDate: new Date(values.publishedDate).toISOString() },
        })
      } else {
        create.mutate({
          data: { ...values, publishedDate: new Date(values.publishedDate).toISOString() },
        })
      }
    },
    [create, id, update],
  )

  const {
    formState: { errors },
    setValue,
  } = form
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const langError: Partial<LangError> = {
    Ru: !!errors.contentRu?.message || !!errors.titleRu?.message,
    Uz: !!errors.contentUz?.message || !!errors.titleUz?.message,
    Kr: !!errors.contentKr?.message || !!errors.titleKr?.message,
  }

  const disabled = useMemo(() => {
    return Object.values(langError).findIndex(item => item) !== -1 || !!errors.publishedDate?.message
  }, [langError, errors.publishedDate])

  const isLoading = useMemo(() => create.isLoading || update.isLoading, [create, update])

  useEffect(() => {
    if (id && data) {
      const d = data[0]
      setValue('contentUz', d.contentUz)
      setValue('contentRu', d.contentRu)
      setValue('contentKr', d.contentKr)
      setValue('titleUz', d.titleUz)
      setValue('titleRu', d.titleRu)
      setValue('titleKr', d.titleKr)
      setValue('publishedDate', new Date(d.publishedDate).toISOString().substring(0, 16))
    }
  }, [data, id, setValue])

  return {
    form,
    onSubmit,
    langError,
    disabled,
    isLoading,
  }
}
