import { useAtomValue, useSetAtom } from 'jotai'

import {
  isMainUnlockedAtom,
  markOnboardingCompletedAtom,
  markOnboardingSkippedAtom,
  onboardingStatusAtom,
  resetOnboardingAtom,
} from '@/store/onboarding'

export const useOnboarding = () => {
  const status = useAtomValue(onboardingStatusAtom)
  const isMainUnlocked = useAtomValue(isMainUnlockedAtom)
  const markSkipped = useSetAtom(markOnboardingSkippedAtom)
  const markCompleted = useSetAtom(markOnboardingCompletedAtom)
  const resetToNone = useSetAtom(resetOnboardingAtom)

  return {
    status,
    isMainUnlocked,
    markSkipped,
    markCompleted,
    resetToNone,
  }
}
