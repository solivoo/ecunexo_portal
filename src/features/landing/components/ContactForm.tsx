import { ButtonComponent } from '@syncfusion/ej2-react-buttons'
import { TextAreaComponent, TextBoxComponent } from '@syncfusion/ej2-react-inputs'
import type { BaseSyntheticEvent, ReactElement } from 'react'
import { Controller, type Control, type FieldErrors } from 'react-hook-form'
import type { ContactFormValues } from '../../../hooks/useContactForm'
import styles from './FigmaLandingPage.module.css'

/** Respuesta de change/input en controles Syncfusion EJ2 */
interface SyncValueArgs {
  readonly value?: string
}

export interface ContactFormProps {
  readonly control: Control<ContactFormValues>
  readonly onSubmitValid: (values: ContactFormValues) => Promise<void>
  readonly errors: FieldErrors<ContactFormValues>
  readonly isSubmitting: boolean
  readonly submitState: 'idle' | 'success' | 'error'
  /** Devuelto por react-hook-form (`useForm`). */
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
  const textChange =
    (onChange: (value: string) => void) =>
    (args: SyncValueArgs): void => {
      onChange(args.value ?? '')
    }

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmitValid)}>
      <h3>Envíanos un mensaje</h3>

      <label>
        Nombre Completo
        <Controller
          name="name"
          control={control}
          rules={{ required: 'El nombre es obligatorio' }}
          render={({ field }) => (
            <TextBoxComponent
              placeholder="Juan Pérez"
              floatLabelType="Never"
              value={field.value ?? ''}
              change={textChange(field.onChange)}
              blur={field.onBlur}
              htmlAttributes={{ name: field.name, id: 'contact-name', autoComplete: 'name' }}
            />
          )}
        />
        {errors.name ? <small className={styles.errorText}>{errors.name.message}</small> : null}
      </label>

      <label>
        Email
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
            <TextBoxComponent
              placeholder="juan@empresa.com"
              floatLabelType="Never"
              type="email"
              value={field.value ?? ''}
              change={textChange(field.onChange)}
              blur={field.onBlur}
              htmlAttributes={{
                name: field.name,
                id: 'contact-email',
                autoComplete: 'email',
              }}
            />
          )}
        />
        {errors.email ? <small className={styles.errorText}>{errors.email.message}</small> : null}
      </label>

      <label>
        Empresa
        <Controller
          name="company"
          control={control}
          render={({ field }) => (
            <TextBoxComponent
              placeholder="Mi Empresa S.A."
              floatLabelType="Never"
              value={field.value ?? ''}
              change={textChange(field.onChange)}
              blur={field.onBlur}
              htmlAttributes={{
                name: field.name,
                id: 'contact-company',
                autoComplete: 'organization',
              }}
            />
          )}
        />
      </label>

      <label>
        Mensaje
        <Controller
          name="message"
          control={control}
          rules={{ required: 'El mensaje es obligatorio' }}
          render={({ field }) => (
            <TextAreaComponent
              placeholder="Cuéntanos sobre tu proyecto..."
              floatLabelType="Never"
              resizeMode="Vertical"
              rows={5}
              value={field.value ?? ''}
              change={textChange(field.onChange)}
              blur={field.onBlur}
              htmlAttributes={{ name: field.name, id: 'contact-message' }}
            />
          )}
        />
        {errors.message ? (
          <small className={styles.errorText}>{errors.message.message}</small>
        ) : null}
      </label>

      <ButtonComponent
        type="submit"
        isPrimary
        disabled={isSubmitting}
        cssClass={`${styles.sfSubmitBtn} e-primary`}
      >
        {isSubmitting ? 'Enviando...' : 'Enviar Mensaje'}{' '}
        <i className="bx bx-send" />
      </ButtonComponent>

      {submitState === 'success' ? (
        <p className={styles.successText}>Mensaje enviado correctamente.</p>
      ) : null}
      {submitState === 'error' ? (
        <p className={styles.errorText}>No se pudo enviar el mensaje. Intenta de nuevo.</p>
      ) : null}
    </form>
  )
}
