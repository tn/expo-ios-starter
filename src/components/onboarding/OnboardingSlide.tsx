import { FC } from 'react'
import { View } from 'react-native'
import Animated, {
  Extrapolation,
  FadeIn,
  FadeInUp,
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated'
import { StyleSheet } from 'react-native-unistyles'
import { Image } from 'expo-image'

import { Icon } from '@/components/Icon'
import { OnboardingSlide as OnboardingSlideModel } from '@/components/onboarding/types'
import { Square } from '@/components/Square'
import { ThemedText } from '@/components/ThemedText'

type Props = {
  slide: OnboardingSlideModel
  index: number
  pageWidth: number
  scrollX: SharedValue<number>
}

export const OnboardingSlide: FC<Props> = ({
  slide,
  index,
  pageWidth,
  scrollX,
}) => {
  const inputRange = [
    (index - 1) * pageWidth,
    index * pageWidth,
    (index + 1) * pageWidth,
  ]

  const mediaAnimatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      scrollX.value,
      inputRange,
      [0.35, 1, 0.35],
      Extrapolation.CLAMP,
    ),
  }))

  const titleAnimatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      scrollX.value,
      inputRange,
      [0.25, 1, 0.25],
      Extrapolation.CLAMP,
    ),
    transform: [
      {
        translateY: interpolate(
          scrollX.value,
          inputRange,
          [20, 0, 20],
          Extrapolation.CLAMP,
        ),
      },
    ],
  }))

  const descriptionAnimatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      scrollX.value,
      inputRange,
      [0.15, 1, 0.15],
      Extrapolation.CLAMP,
    ),
    transform: [
      {
        translateY: interpolate(
          scrollX.value,
          inputRange,
          [28, 0, 28],
          Extrapolation.CLAMP,
        ),
      },
    ],
  }))

  return (
    <View style={[styles.slide, { width: pageWidth }]}>
      <Animated.View
        entering={FadeIn.duration(320)}
        style={[styles.mediaWrapper, mediaAnimatedStyle]}
      >
        {slide.media.type === 'icon' ? (
          <Square radius="large" size={136} tone="accentSubtle">
            <Icon
              fallback={slide.media.icon.fallback}
              name={slide.media.icon.name}
              scale={slide.media.icon.scale}
              size={slide.media.icon.size ?? 72}
              tone={slide.media.icon.tone ?? 'accent'}
              type={slide.media.icon.type}
              weight={slide.media.icon.weight}
            />
          </Square>
        ) : (
          <Image
            accessibilityLabel={slide.media.accessibilityLabel}
            contentFit={slide.media.contentFit ?? 'contain'}
            placeholder={slide.media.placeholder}
            source={slide.media.source}
            style={styles.image}
            transition={slide.media.transition ?? 320}
          />
        )}
      </Animated.View>

      <Animated.View
        entering={FadeInUp.duration(360)}
        style={titleAnimatedStyle}
      >
        <ThemedText size="title2" style={styles.title}>
          {slide.title}
        </ThemedText>
      </Animated.View>

      <Animated.View
        entering={FadeInUp.delay(80).duration(420)}
        style={descriptionAnimatedStyle}
      >
        <ThemedText size="callout" style={styles.description} tone="secondary">
          {slide.description}
        </ThemedText>
      </Animated.View>
    </View>
  )
}

const styles = StyleSheet.create(theme => ({
  slide: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing.space20,
    paddingHorizontal: theme.spacing.space24,
  },
  mediaWrapper: {
    alignItems: 'center',
    height: 260,
    justifyContent: 'center',
    width: '100%',
  },
  image: {
    height: '100%',
    maxWidth: 320,
    width: '78%',
  },
  title: {
    textAlign: 'center',
  },
  description: {
    maxWidth: 340,
    textAlign: 'center',
  },
}))
