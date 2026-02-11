import { FC } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StyleSheet } from 'react-native-unistyles'
import { useRouter } from 'expo-router'

import {
  OnboardingFlow,
  OnboardingSlide,
} from '@/components/onboarding/OnboardingFlow'
import { useOnboarding } from '@/hooks/useOnboarding'

const slides: OnboardingSlide[] = [
  {
    id: 'build-faster',
    title: 'Build iOS apps faster',
    description:
      'Ship product ideas quickly with Expo Router, native modules, and a starter that is ready for production.',
    media: {
      type: 'icon',
      icon: {
        name: 'speedometer',
        size: 72,
        tone: 'accent',
      },
    },
  },
  {
    id: 'native-image',
    title: 'Smooth native image rendering',
    description:
      'Load visuals with expo-image and keep transitions clean with caching and polished rendering.',
    media: {
      type: 'image',
      source: require('../../assets/splash-icon.png'),
      contentFit: 'contain',
      transition: 280,
      accessibilityLabel: 'App splash icon',
    },
  },
  {
    id: 'state-ready',
    title: 'State that survives restarts',
    description:
      'Your onboarding progress is saved with MMKV and Jotai, so users always continue from the right place.',
    media: {
      type: 'icon',
      icon: {
        name: 'externaldrive',
        size: 72,
        tone: 'accent',
      },
    },
  },
]

export const OnboardingScreen: FC = () => {
  const router = useRouter()
  const { markSkipped, markCompleted } = useOnboarding()

  return (
    <SafeAreaView edges={['top', 'bottom']} style={styles.safeArea}>
      <OnboardingFlow
        onFinish={() => {
          markCompleted()
          router.replace('/')
        }}
        onSkip={() => {
          markSkipped()
          router.replace('/')
        }}
        slides={slides}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create(theme => ({
  safeArea: {
    backgroundColor: theme.colors.background.page,
    flex: 1,
  },
}))
