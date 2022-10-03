import { useWorkPlan } from 'Hooks'
import * as yup from 'yup'
import { APP } from 'Constants/App'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup/dist/yup'
import { useCallback, useEffect, useMemo } from 'react'
import { ControllerHookProps, LangError } from 'Types/app'
import { WorkPlan, WorkPlanTypeEnum } from 'Entities/about'
import { useNavigate } from 'react-router-dom'
import { AboutPath } from 'Constants/Navigation'

type Props = ControllerHookProps
type Values = Omit<WorkPlan, 'id'>

export function useWorkPlanForm(props: Props) {
  const navigate = useNavigate()
  const { detailQuery: { data }, create, update } = useWorkPlan(props)
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
      workPlanTypeEnum: WorkPlanTypeEnum.MONTH,
    },
    resolver: yupResolver(schema),
  })

  const action = useCallback(() => {
    navigate(`/${AboutPath.main}/${AboutPath.plan}`)
  }, [ navigate ])

  const onSubmit = useCallback((values: Values) => {
    if (props.detailId) {
      update.mutate({ id: props.detailId, data: values, action })
    } else {
      create.mutate({ data: values, action })
    }
  }, [ action, create, props.detailId, update ])

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
    if (props.detailId && data) {
      setValue('contentUz', data.contentUz)
      setValue('contentRu', data.contentRu)
      setValue('contentKr', data.contentKr)
      setValue('titleUz', data.titleUz)
      setValue('titleRu', data.titleRu)
      setValue('titleKr', data.titleKr)
      setValue('workPlanTypeEnum', data.workPlanTypeEnum)
    }
  }, [ data, props.detailId, setValue ])

  return {
    form,
    onSubmit,
    langError,
    disabled,
    isLoading,
  }
}