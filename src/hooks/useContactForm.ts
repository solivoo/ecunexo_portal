import { useState } from 'react'
import { useForm } from 'react-hook-form'

export interface ContactFormValues {
  readonly name: string
  readonly email: string
  readonly company: string
  readonly message: string
}

interface UseContactFormResult {
  readonly register: ReturnType<typeof useForm<ContactFormValues>>['register']
  readonly handleSubmit: ReturnType<typeof useForm<ContactFormValues>>['handleSubmit']
  readonly errors: ReturnType<typeof useForm<ContactFormValues>>['formState']['errors']
  readonly isSubmitting: boolean
  readonly submitState: 'idle' | 'success' | 'error'
  readonly onSubmit: (values: ContactFormValues) => Promise<void>
}

export function useContactForm(): UseContactFormResult {
  const [submitState, setSubmitState] = useState<'idle' | 'success' | 'error'>('idle')
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormValues>({
    defaultValues: {
      name: '',
      email: '',
      company: '',
      message: '',
    },
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

      setSubmitState('success')
      reset()
    } catch {
      setSubmitState('error')
    }
  }

  return {
    register,
    handleSubmit,
    errors,
    isSubmitting,
    submitState,
    onSubmit,
  }
}
