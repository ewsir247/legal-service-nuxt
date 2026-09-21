// Shared client+server helpers for the callback form/API.
// Auto-imported by Nuxt 4 from the top-level `shared/` directory on both
// the Nitro server and the Vue app, so client and server always agree on
// what counts as a valid phone number (min 10 digits, country code excluded).

import { z } from 'zod'

/** Strip everything but digits. */
export function phoneDigits(phone: string): string {
  return (phone || '').replace(/\D/g, '')
}

/** Minimum digit count required for a phone to be considered valid (no country code). */
export const MIN_PHONE_DIGITS = 10

/**
 * A phone is valid once it has at least MIN_PHONE_DIGITS digits, ignoring a
 * leading country code digit (7/8) if present on an 11-digit number.
 */
export function isValidPhone(phone: string): boolean {
  let digits = phoneDigits(phone)
  if (digits.length === 11 && (digits[0] === '7' || digits[0] === '8')) {
    digits = digits.slice(1)
  }
  return digits.length >= MIN_PHONE_DIGITS
}

export const callbackSchema = z.object({
  name: z.string().max(100).optional().default(''),
  phone: z.string().min(1, 'Укажите корректный номер телефона.').max(40),
  comment: z.string().max(500).optional().default(''),
  page: z.string().max(300).optional().default(''),
  website: z.string().optional().default(''), // honeypot
  turnstileToken: z.string().optional().default(''),
  idempotencyKey: z.string().max(100).optional().default(''),
}).superRefine((data, ctx) => {
  if (!isValidPhone(data.phone)) {
    ctx.addIssue({ code: 'custom', path: ['phone'], message: 'Укажите корректный номер телефона.' })
  }
  if (data.page) {
    try {
      new URL(data.page)
    } catch {
      ctx.addIssue({ code: 'custom', path: ['page'], message: 'Некорректный адрес страницы.' })
    }
  }
})

export type CallbackPayload = z.infer<typeof callbackSchema>
