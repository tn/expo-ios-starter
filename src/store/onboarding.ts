import { atom } from 'jotai'

import { atomWithMMKV } from '@/store/atomWithMMKV'

export type OnboardingStatus = 'none' | 'skipped' | 'completed'

const ONBOARDING_STATUS_KEY = 'onboarding.status'

const isOnboardingStatus = (value: unknown): value is OnboardingStatus => {
  return value === 'none' || value === 'skipped' || value === 'completed'
}

const onboardingStatusAtom = atomWithMMKV<OnboardingStatus>(
  ONBOARDING_STATUS_KEY,
  'none',
  isOnboardingStatus,
)

const isMainUnlockedAtom = atom(get => get(onboardingStatusAtom) !== 'none')

const markOnboardingSkippedAtom = atom(null, (_get, set) => {
  set(onboardingStatusAtom, 'skipped')
})

const markOnboardingCompletedAtom = atom(null, (_get, set) => {
  set(onboardingStatusAtom, 'completed')
})

const resetOnboardingAtom = atom(null, (_get, set) => {
  set(onboardingStatusAtom, 'none')
})

export {
  isMainUnlockedAtom,
  markOnboardingCompletedAtom,
  markOnboardingSkippedAtom,
  onboardingStatusAtom,
  resetOnboardingAtom,
}
