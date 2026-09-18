// Lets any page/section trigger the floating CallbackWidget's modal
// (e.g. a CTA button after a landing section) without prop-drilling.
export const CALLBACK_OPEN_EVENT = 'ls:open-callback'

export function openCallbackModal() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent(CALLBACK_OPEN_EVENT))
  }
}
