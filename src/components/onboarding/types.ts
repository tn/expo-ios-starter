import { ComponentProps } from 'react'
import { ImageProps } from 'expo-image'

import { Icon } from '@/components/Icon'

type OnboardingIconMedia = {
  type: 'icon'
  icon: Pick<
    ComponentProps<typeof Icon>,
    'name' | 'size' | 'weight' | 'scale' | 'type' | 'fallback' | 'tone'
  >
}

type OnboardingImageMedia = {
  type: 'image'
  source: ImageProps['source']
  placeholder?: ImageProps['placeholder']
  contentFit?: ImageProps['contentFit']
  transition?: ImageProps['transition']
  accessibilityLabel?: string
}

export type OnboardingSlide = {
  id: string
  title: string
  description: string
  media: OnboardingIconMedia | OnboardingImageMedia
}

export type OnboardingInteractionTrigger = 'button' | 'swipe'

export type OnboardingActionPayload = {
  id: string
  index: number
  total: number
  trigger: OnboardingInteractionTrigger
}

export type OnboardingFlowProps = {
  slides: OnboardingSlide[]
  initialIndex?: number
  onSlideChange?: (payload: OnboardingActionPayload) => void
  onBack?: (payload: OnboardingActionPayload) => void
  onNext?: (payload: OnboardingActionPayload) => void
  onSkip?: (payload: OnboardingActionPayload) => void
  onFinish?: (payload: OnboardingActionPayload) => void
}
