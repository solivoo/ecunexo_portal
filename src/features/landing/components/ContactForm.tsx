import { Button, Select, TextArea, TextBox } from 'glubox'
import type { BaseSyntheticEvent, ReactElement } from 'react'
import { Controller, type Control, type FieldErrors } from 'react-hook-form'
import type { ContactFormValues } from '../../../hooks/useContactForm'
import styles from './FigmaLandingPage.module.css'

const topicOptions = [
  { value: 'demo', label: 'Solicitar demo' },
  { value: 'pricing', label: 'Precios e implementación' },
  { value: 'support', label: 'Soporte técnico' },
  { value: 'other', label: 'Otra consulta' },
] as const

export interface ContactFormProps {
  readonly control: Control<ContactFormValues>
  readonly onSubmitValid: (values: ContactFormValues) => Promise<void>
  readonly errors: FieldErrors<ContactFormValues>
  readonly isSubmitting: boolean
  readonly submitState: 'idle' | 'success' | 'error'
  readonly handleSubmit: (
    onValid: (values: ContactFormValues) => Promise<void>,
  ) => (e?: BaseSyntheticEvent) => Promise<void>
}

export function ContactForm({
  control,
  onSubmitValid,
  errors,
  isSubmitting,
  submitState,
  handleSubmit,
}: ContactFormProps): ReactElement {
  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmitValid)} noValidate>
      <h3>Envíanos un mensaje</h3>

      <div className={styles.formField}>
        <Controller
          name="name"
          control={control}
          rules={{ required: 'El nombre es obligatorio' }}
          render={({ field }) => (
            <TextBox
              {...field}
              id="contact-name"
              label="Nombre"
              labelPosition="floating"
              variant="outline"
              fullWidth
              autoComplete="name"
              placeholder="Juan Pérez"
              errorMessage={errors.name?.message}
            />
          )}
        />
      </div>

      <div className={styles.formField}>
        <Controller
          name="email"
          control={control}
          rules={{
            required: 'El email es obligatorio',
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: 'Ingresa un email válido',
            },
          }}
          render={({ field }) => (
            <TextBox
              {...field}
              id="contact-email"
              type="email"
              label="Email"
              labelPosition="floating"
              variant="outline"
              fullWidth
              autoComplete="email"
              placeholder="juan@empresa.com"
              errorMessage={errors.email?.message}
            />
          )}
        />
      </div>

      <div className={styles.formField}>
        <Controller
          name="company"
          control={control}
          render={({ field }) => (
            <TextBox
              {...field}
              id="contact-company"
              label="Empresa"
              labelPosition="floating"
              variant="outline"
              fullWidth
              autoComplete="organization"
              placeholder="Opcional"
              showClearButton
            />
          )}
        />
      </div>

      <div className={styles.formField}>
        <Controller
          name="topic"
          control={control}
          rules={{ required: 'Selecciona el tipo de consulta' }}
          render={({ field }) => (
            <Select
              id="contact-topic"
              label="Tipo de consulta"
              labelPosition="floating"
              variant="outline"
              fullWidth
              placeholder="Seleccionar..."
              options={[...topicOptions]}
              value={field.value || undefined}
              onChange={(value) => field.onChange(value)}
              name={field.name}
              errorMessage={errors.topic?.message}
              showClearButton
            />
          )}
        />
      </div>

      <div className={styles.formField}>
        <Controller
          name="message"
          control={control}
          rules={{ required: 'El mensaje es obligatorio' }}
          render={({ field }) => (
            <TextArea
              {...field}
              id="contact-message"
              label="Mensaje"
              labelPosition="floating"
              variant="outline"
              fullWidth
              rows={5}
              resize="vertical"
              placeholder="Cuéntanos sobre tu operación o lo que necesitas"
              errorMessage={errors.message?.message}
            />
          )}
        />
      </div>

      <Button type="submit" variant="primary" fullWidth loading={isSubmitting} disabled={isSubmitting}>
        {isSubmitting ? 'Enviando...' : 'Enviar mensaje'}
      </Button>

      {submitState === 'success' ? (
        <p className={styles.successText}>Mensaje enviado correctamente. Te responderemos pronto.</p>
      ) : null}
      {submitState === 'error' ? (
        <p className={styles.errorText}>No se pudo enviar el mensaje. Intenta de nuevo.</p>
      ) : null}
    </form>
  )
}
