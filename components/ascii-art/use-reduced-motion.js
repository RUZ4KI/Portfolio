import { useSyncExternalStore } from 'react'

const query = '(prefers-reduced-motion: reduce)'

const subscribe = listener => {
  const preference = window.matchMedia(query)
  preference.addEventListener('change', listener)
  return () => preference.removeEventListener('change', listener)
}

const getSnapshot = () => window.matchMedia(query).matches
const getServerSnapshot = () => true

const useReducedMotionPreference = () =>
  useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)

export default useReducedMotionPreference
