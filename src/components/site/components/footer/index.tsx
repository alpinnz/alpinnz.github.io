import * as React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useLocalization, useValfuseForm } from '@valfuse-node/react'
import { createSchema, t as transforms } from '@valfuse-node/validation'
import { useLocalizedModule } from '../../locales/use-localized-module'
import { socialLinks } from '@/data/social-links'

const iconMap: Record<string, string> = {
  ic_address: '/assets/icons/ic_address.svg',
  ic_email: '/assets/icons/ic_email.svg',
}

interface ButtonProps {
  label: string
  disabled: boolean
}

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & { error?: string }
type TextAreaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & { error?: string }

const defaultContactValues = { name: '', email: '', phone: '', message: '' }
const contactRequestTimeoutMs = 15_000

type ContactSubmissionStatus = 'idle' | 'success' | 'error' | 'not-configured'

function Input({ error, ...props }: InputProps) {
  const errorId = props.id ? `${props.id}-error` : undefined

  return (
    <div>
      <input
        {...props}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        className="h-11 w-full rounded-xl border border-neutral-200 bg-neutral-0 px-3 py-2 text-sm text-neutral-800 transition-colors placeholder:text-neutral-500 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-100"
      />
      {error && <p id={errorId} role="alert" className="mt-1 text-xs text-danger-600">{error}</p>}
    </div>
  )
}

function TextArea({ error, ...props }: TextAreaProps) {
  const errorId = props.id ? `${props.id}-error` : undefined

  return (
    <div>
      <textarea
        {...props}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        className="block w-full resize-y rounded-xl border border-neutral-200 bg-neutral-0 px-3 py-2 text-sm text-neutral-800 transition-colors placeholder:text-neutral-500 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-100"
      />
      {error && <p id={errorId} role="alert" className="mt-1 text-xs text-danger-600">{error}</p>}
    </div>
  )
}

function Button({ label, disabled }: ButtonProps) {
  return (
    <button
      type="submit"
      disabled={disabled}
      className="min-h-11 w-full rounded-full bg-primary-600 px-7 py-2.5 font-medium text-neutral-0 transition-colors hover:bg-primary-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 disabled:opacity-60 sm:w-auto"
    >
      {label}
    </button>
  )
}

export function Footer(): React.ReactElement {
  const translations = useLocalizedModule('footer')
  const { format } = useLocalization()
  const [submissionStatus, setSubmissionStatus] = React.useState<ContactSubmissionStatus>('idle')
  const schema = createSchema({
    name: { type: 'string', rules: [
      { name: 'required', error: { code: 'required', message: translations.validation.required } },
      { name: 'regex', value: /\S/u, error: { code: 'required', message: translations.validation.required } },
    ] },
    email: { type: 'string', transform: transforms.trim, rules: [
      { name: 'required', error: { code: 'required', message: translations.validation.required } },
      { name: 'email', error: { code: 'email', message: translations.validation.email } },
    ] },
    phone: { type: 'string', rules: [] },
    message: { type: 'string', rules: [
      { name: 'required', error: { code: 'required', message: translations.validation.required } },
      { name: 'regex', value: /\S/u, error: { code: 'required', message: translations.validation.required } },
    ] },
  })
  const form = useValfuseForm({ schema, defaultValues: defaultContactValues })
  const errors = form.formState.errors
  const requiredError = (field: 'name' | 'message') => errors[field] ? translations.validation.required : undefined
  const emailError = errors.email
    ? errors.email.code === 'email' ? translations.validation.email : translations.validation.required
    : undefined

  const sendContactMessage = form.handleSubmit(async (values) => {
    setSubmissionStatus('idle')

    const formId = process.env.NEXT_PUBLIC_FORMSPREE_FORM_ID
    if (!formId) {
      setSubmissionStatus('not-configured')
      return
    }

    const payload = new FormData()
    payload.set('name', values.name.trim())
    payload.set('email', values.email.trim())
    payload.set('phone', values.phone.trim())
    payload.set('message', values.message.trim())
    payload.set('_subject', `Portfolio contact from ${values.name.trim()}`)
    payload.set(
      '_gotcha',
      document.querySelector<HTMLInputElement>('#contact input[name="_gotcha"]')?.value ?? '',
    )

    const controller = new AbortController()
    const timeoutId = window.setTimeout(() => controller.abort(), contactRequestTimeoutMs)

    try {
      const response = await fetch(`https://formspree.io/f/${formId}`, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: payload,
        signal: controller.signal,
      })

      if (!response.ok) {
        setSubmissionStatus('error')
        return
      }

      form.reset()
      setSubmissionStatus('success')
    } catch {
      setSubmissionStatus('error')
    } finally {
      window.clearTimeout(timeoutId)
    }
  })

  const contactItems = translations.contactItems

  return (
    <section
      id="footer"
      className="scroll-mt-24 border-t border-neutral-200/80 bg-white px-5 py-10 sm:px-8 sm:py-12 lg:px-10"
    >
      <motion.div
        className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.6fr)] lg:gap-10"
        initial={{ y: 40 }}
        whileInView={{ y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        {/* Contact Info */}
        <div className="flex min-w-0 flex-col gap-4">
          <h2 className="text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl">
            {translations.header.title}
          </h2>
          <p className="max-w-lg text-sm leading-relaxed text-neutral-600 sm:text-base">
            {translations.header.subtitle}
          </p>
          <div className="mt-2 flex flex-col gap-3">
            {contactItems.map((item, index) => (
              <motion.div
                key={index}
                className="flex items-start gap-3 text-sm sm:text-base"
                initial={{ x: -30 }}
                whileInView={{ x: 0 }}
                transition={{ delay: 0.1 * index }}
                viewport={{ once: true }}
              >
                <Image
                  src={iconMap[item.icon]}
                  alt=""
                  width={20}
                  height={20}
                  className="mt-0.5 h-5 w-5 shrink-0 brightness-0 opacity-70"
                />
                {item.link ? (
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noreferrer"
                    className="break-all text-neutral-700 transition-colors hover:text-primary-700"
                  >
                    {item.title}
                  </a>
                ) : (
                  <div className="text-neutral-700">
                    {item.title}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
          <nav aria-label={translations.social_label} className="mt-1">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-neutral-600">
              {translations.social_label}
            </p>
            <div className="flex flex-wrap gap-2">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-10 items-center gap-1.5 rounded-full border border-neutral-200 bg-neutral-50 px-3.5 text-sm font-semibold text-neutral-700 transition-colors hover:border-primary-400 hover:bg-primary-50 hover:text-primary-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
                >
                  {link.label} <span aria-hidden="true">↗</span>
                </a>
              ))}
            </div>
          </nav>
        </div>

        {/* Contact Form */}
        <form
          id="contact"
          className="flex scroll-mt-24 flex-col gap-3 rounded-2xl border border-neutral-200/80 bg-white p-4 shadow-sm sm:p-5"
          onSubmit={sendContactMessage}
          noValidate
        >
          <input
            type="text"
            name="_gotcha"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            className="absolute -left-[10000px] top-auto h-px w-px overflow-hidden"
          />
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            <div className="grid gap-1.5">
              <label htmlFor="contact-name" className="text-xs font-medium text-neutral-700">{translations.form.labels.name}</label>
              <Input id="contact-name" {...form.register('name')} placeholder={translations.form.name} autoComplete="name" required error={requiredError('name')} />
            </div>
            <div className="grid gap-1.5">
              <label htmlFor="contact-email" className="text-xs font-medium text-neutral-700">{translations.form.labels.email}</label>
              <Input id="contact-email" {...form.register('email')} type="email" placeholder={translations.form.email} autoComplete="email" required error={emailError} />
            </div>
          </div>
          <div className="grid gap-1.5">
            <label htmlFor="contact-phone" className="text-xs font-medium text-neutral-700">{translations.form.labels.phone}</label>
            <Input id="contact-phone" {...form.register('phone')} type="tel" placeholder={translations.form.phone} autoComplete="tel" error={form.formState.errors.phone?.message} />
          </div>
          <div className="grid gap-1.5">
            <label htmlFor="contact-message" className="text-xs font-medium text-neutral-700">{translations.form.labels.message}</label>
            <TextArea id="contact-message" {...form.register('message')} rows={3} placeholder={translations.form.message} required error={requiredError('message')} />
          </div>
          <div className="mt-1">
            <Button
              label={form.formState.isSubmitting ? translations.form.sending : translations.form.submit}
              disabled={form.formState.isSubmitting}
            />
          </div>
          <p className="text-xs leading-relaxed text-neutral-600">
            {translations.form.privacy_note}
          </p>
          {submissionStatus !== 'idle' && (
            <p
              role={submissionStatus === 'success' ? 'status' : 'alert'}
              className={`text-sm ${submissionStatus === 'success' ? 'text-green-700' : 'text-danger-700'}`}
            >
              {submissionStatus === 'success' && translations.form.success}
              {submissionStatus === 'error' && translations.form.error}
              {submissionStatus === 'not-configured' && translations.form.not_configured}
            </p>
          )}
        </form>
      </motion.div>

      {/* Copyright */}
      <div className="mx-auto mt-8 max-w-6xl border-t border-neutral-200/80 pt-5 text-center text-xs text-neutral-500 sm:text-sm">
        {format('footer.copyright', { year: String(new Date().getFullYear()) })}
      </div>
    </section>
  )
}
