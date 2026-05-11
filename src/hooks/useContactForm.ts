import { useState } from 'react'
import { useForm, type Control, type FieldErrors, type UseFormHandleSubmit } from 'react-hook-form'

export interface ContactFormValues {
  readonly name: string
  readonly email: string
  readonly company: string
  readonly message: string
}

const defaultFormValues: ContactFormValues = {
  name: '',
  email: '',
  company: '',
  message: '',
}

interface UseContactFormResult {
  readonly control: Control<ContactFormValues>
  readonly handleSubmit: UseFormHandleSubmit<ContactFormValues>
  readonly errors: FieldErrors<ContactFormValues>
  readonly isSubmitting: boolean
  readonly submitState: 'idle' | 'success' | 'error'
  readonly onSubmit: (values: ContactFormValues) => Promise<void>
}

export function useContactForm(): UseContactFormResult {
  const [submitState, setSubmitState] = useState<'idle' | 'success' | 'error'>('idle')
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    clearErrors,
  } = useForm<ContactFormValues>({
    defaultValues: defaultFormValues,
    /* Tras enviar, reset vacía campos; Syncfusion dispara `change` y con onChange se revalidaba todo. */
    reValidateMode: 'onSubmit',
  })

  const onSubmit = async (values: ContactFormValues): Promise<void> => {
    const baseUrl = import.meta.env.VITE_MAIL_SERVICE_URL ?? 'http://localhost:4001'

    try {
      const response = await fetch(`${baseUrl}/api/mail/send`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      })

      if (!response.ok) {
        setSubmitState('error')
        return
      }

      reset(defaultFormValues, {
        keepErrors: false,
        keepDirty: false,
        keepTouched: false,
        keepIsSubmitted: false,
        keepSubmitCount: false,
      })
      clearErrors()
      setSubmitState('success')
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
  }
}
