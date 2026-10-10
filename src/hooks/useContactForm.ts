import { useToast } from 'glubox'
import { useState } from 'react'
import { useForm, type Control, type FieldErrors, type UseFormHandleSubmit } from 'react-hook-form'

export interface ContactFormValues {
  readonly name: string
  readonly email: string
  readonly company: string
  readonly topic: string
  readonly message: string
}

export const topicOptions = [
  { value: 'demo', label: 'Solicitar demo' },
  { value: 'pricing', label: 'Propuesta y precios' },
  { value: 'support', label: 'Soporte técnico' },
  { value: 'other', label: 'Otra consulta' },
] as const

const defaultFormValues: ContactFormValues = {
  name: '',
  email: '',
  company: '',
  topic: '',
  message: '',
}

interface UseContactFormResult {
  readonly control: Control<ContactFormValues>
  readonly handleSubmit: UseFormHandleSubmit<ContactFormValues>
  readonly errors: FieldErrors<ContactFormValues>
  readonly isSubmitting: boolean
  readonly submitState: 'idle' | 'success' | 'error'
  readonly onSubmit: (values: ContactFormValues) => Promise<void>
  readonly selectTopic: (topic: string) => void
}

export function useContactForm(): UseContactFormResult {
  const { show } = useToast()
  const [submitState, setSubmitState] = useState<'idle' | 'success' | 'error'>('idle')
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    clearErrors,
    setValue,
  } = useForm<ContactFormValues>({
    defaultValues: defaultFormValues,
    reValidateMode: 'onChange',
  })

  const selectTopic = (topic: string): void => {
    setValue('topic', topic, { shouldValidate: false })
  }

  const onSubmit = async (values: ContactFormValues): Promise<void> => {
    const baseUrl = import.meta.env.VITE_MAIL_SERVICE_URL ?? 'http://localhost:4001'
    setSubmitState('idle')

    try {
      const response = await fetch(`${baseUrl}/api/mail/send`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...values,
          topicLabel: topicOptions.find((option) => option.value === values.topic)?.label ?? values.topic,
        }),
      })

      if (!response.ok) {
        setSubmitState('error')
        return
      }

      reset(defaultFormValues)
      clearErrors()
      setSubmitState('success')
      show({
        title: 'Mensaje enviado',
        message: 'Gracias por escribirnos. Te responderemos pronto.',
        variant: 'success',
        duration: 5000,
        showProgress: true,
      })
    } catch {
      setSubmitState('error')
    }
  }

  return {
    control,
    handleSubmit,
    errors,
    isSubmitting,
    submitState,
    onSubmit,
    selectTopic,
  }
}
