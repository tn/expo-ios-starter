import { FC, useCallback, useEffect, useRef, useState } from 'react'
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  Pressable,
  ScrollView,
  useWindowDimensions,
  View,
} from 'react-native'
import Animated, {
  Extrapolation,
  interpolate,
  SharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  ZoomIn,
  ZoomOut,
} from 'react-native-reanimated'
import { StyleSheet } from 'react-native-unistyles'

import { Icon } from '@/components/Icon'
import { OnboardingSlide as OnboardingSlideCard } from '@/components/onboarding/OnboardingSlide'
import {
  OnboardingActionPayload,
  OnboardingFlowProps,
  OnboardingInteractionTrigger,
} from '@/components/onboarding/types'
import { ThemedButton } from '@/components/ThemedButton'
import { useTheme } from '@/hooks/useTheme'

const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView)

const clampIndex = (index: number, maxIndex: number) => {
  return Math.min(Math.max(index, 0), maxIndex)
}

type PaginationDotProps = {
  index: number
  pageWidth: number
  scrollX: SharedValue<number>
}

const PaginationDot: FC<PaginationDotProps> = ({
  index,
  pageWidth,
  scrollX,
}) => {
  const inputRange = [
    (index - 1) * pageWidth,
    index * pageWidth,
    (index + 1) * pageWidth,
  ]

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      scrollX.value,
      inputRange,
      [0.45, 1, 0.45],
      Extrapolation.CLAMP,
    ),
    width: interpolate(
      scrollX.value,
      inputRange,
      [8, 24, 8],
      Extrapolation.CLAMP,
    ),
  }))

  return <Animated.View style={[styles.progressDot, animatedStyle]} />
}

export const OnboardingFlow: FC<OnboardingFlowProps> = ({
  slides,
  initialIndex = 0,
  onSlideChange,
  onBack,
  onNext,
  onSkip,
  onFinish,
}) => {
  const theme = useTheme()
  const total = slides.length
  const maxIndex = Math.max(total - 1, 0)
  const initial = clampIndex(initialIndex, maxIndex)
  const [activeIndex, setActiveIndex] = useState(initial)
  const { width } = useWindowDimensions()
  const scrollViewRef = useRef<ScrollView>(null)
  const pendingTriggerRef = useRef<OnboardingInteractionTrigger | null>(null)
  const scrollX = useSharedValue(initial * width)

  const onScroll = useAnimatedScrollHandler(event => {
    scrollX.value = event.contentOffset.x
  })

  const createPayload = useCallback(
    (
      index: number,
      trigger: OnboardingInteractionTrigger,
    ): OnboardingActionPayload => ({
      id: slides[index].id,
      index,
      total,
      trigger,
    }),
    [slides, total],
  )

  const scrollToIndex = useCallback(
    (index: number, trigger: OnboardingInteractionTrigger) => {
      pendingTriggerRef.current = trigger
      scrollViewRef.current?.scrollTo({
        x: index * width,
        animated: true,
      })
    },
    [width],
  )

  const handleMomentumScrollEnd = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      if (width <= 0 || total === 0) {
        return
      }

      const nextIndex = clampIndex(
        Math.round(event.nativeEvent.contentOffset.x / width),
        maxIndex,
      )

      if (nextIndex === activeIndex) {
        pendingTriggerRef.current = null

        return
      }

      const trigger = pendingTriggerRef.current ?? 'swipe'
      pendingTriggerRef.current = null
      setActiveIndex(nextIndex)
      onSlideChange?.(createPayload(nextIndex, trigger))
    },
    [activeIndex, createPayload, maxIndex, onSlideChange, total, width],
  )

  const handleBack = useCallback(() => {
    if (activeIndex <= 0) {
      return
    }

    const nextIndex = activeIndex - 1
    const payload = createPayload(nextIndex, 'button')
    onBack?.(payload)
    scrollToIndex(nextIndex, 'button')
  }, [activeIndex, createPayload, onBack, scrollToIndex])

  const handleNext = useCallback(() => {
    if (activeIndex >= maxIndex) {
      return
    }

    const nextIndex = activeIndex + 1
    const payload = createPayload(nextIndex, 'button')
    onNext?.(payload)
    scrollToIndex(nextIndex, 'button')
  }, [activeIndex, createPayload, maxIndex, onNext, scrollToIndex])

  const handleSkip = useCallback(() => {
    onSkip?.(createPayload(activeIndex, 'button'))
  }, [activeIndex, createPayload, onSkip])

  const handleFinish = useCallback(() => {
    onFinish?.(createPayload(activeIndex, 'button'))
  }, [activeIndex, createPayload, onFinish])

  useEffect(() => {
    if (total === 0) {
      return
    }

    setActiveIndex(clampIndex(initialIndex, maxIndex))
  }, [initialIndex, maxIndex, total])

  useEffect(() => {
    if (total === 0) {
      return
    }

    setActiveIndex(current => clampIndex(current, maxIndex))
  }, [maxIndex, total])

  useEffect(() => {
    if (total === 0) {
      return
    }

    const frame = requestAnimationFrame(() => {
      scrollViewRef.current?.scrollTo({
        x: activeIndex * width,
        animated: false,
      })
    })

    return () => {
      cancelAnimationFrame(frame)
    }
  }, [activeIndex, total, width])

  if (total === 0) {
    return null
  }

  const isLastSlide = activeIndex === maxIndex

  return (
    <View style={styles.container}>
      {!isLastSlide ? (
        <View style={styles.topActions}>
          <Animated.View
            entering={ZoomIn.duration(220)}
            exiting={ZoomOut.duration(180)}
          >
            <Pressable
              accessibilityLabel="Skip onboarding"
              accessibilityRole="button"
              onPress={handleSkip}
              style={({ pressed }) => [
                styles.skipCircle,
                {
                  backgroundColor: pressed
                    ? theme.colors.background.neutral.default
                    : theme.colors.background.subtle,
                },
                pressed && styles.skipCirclePressed,
              ]}
            >
              <Icon name="xmark" size={15} tone="secondary" />
            </Pressable>
          </Animated.View>
        </View>
      ) : null}

      <AnimatedScrollView
        bounces={false}
        horizontal
        onMomentumScrollEnd={handleMomentumScrollEnd}
        onScroll={onScroll}
        pagingEnabled
        ref={scrollViewRef}
        scrollEventThrottle={16}
        showsHorizontalScrollIndicator={false}
      >
        {slides.map((slide, index) => (
          <OnboardingSlideCard
            index={index}
            key={slide.id}
            pageWidth={width}
            scrollX={scrollX}
            slide={slide}
          />
        ))}
      </AnimatedScrollView>

      <View style={styles.footer}>
        <View style={styles.progress}>
          {slides.map((slide, index) => (
            <PaginationDot
              index={index}
              key={slide.id}
              pageWidth={width}
              scrollX={scrollX}
            />
          ))}
        </View>

        <View style={styles.controlsRow}>
          <ThemedButton
            disabled={activeIndex === 0}
            label="Back"
            onPress={handleBack}
            radius="full"
            size="medium"
            style={styles.controlButton}
            tone="neutral"
          />

          <View style={styles.trailingButtons}>
            <ThemedButton
              label={isLastSlide ? 'Finish' : 'Next'}
              onPress={isLastSlide ? handleFinish : handleNext}
              radius="full"
              size="medium"
              style={styles.controlButton}
              tone="accent"
            />
          </View>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create(theme => ({
  container: {
    backgroundColor: theme.colors.background.page,
    flex: 1,
  },
  topActions: {
    alignItems: 'flex-end',
    left: 0,
    paddingHorizontal: theme.spacing.space20,
    paddingTop: theme.spacing.space12,
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: theme.zIndices.floating,
  },
  skipCircle: {
    alignItems: 'center',
    borderRadius: theme.radii.full,
    height: theme.sizing.size32,
    justifyContent: 'center',
    width: theme.sizing.size32,
  },
  skipCirclePressed: {
    opacity: 0.9,
  },
  footer: {
    gap: theme.spacing.space12,
    paddingBottom: theme.spacing.space24,
    paddingHorizontal: theme.spacing.space20,
    paddingTop: theme.spacing.space20,
  },
  progress: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: theme.spacing.space8,
    justifyContent: 'center',
  },
  progressDot: {
    backgroundColor: theme.colors.foreground.accent.default,
    borderRadius: theme.radii.full,
    height: theme.sizing.size8,
    width: theme.sizing.size8,
  },
  controlsRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  trailingButtons: {
    flexDirection: 'row',
    gap: theme.spacing.space12,
  },
  controlButton: {
    minWidth: 96,
  },
}))

export type {
  OnboardingActionPayload,
  OnboardingFlowProps,
  OnboardingSlide,
} from '@/components/onboarding/types'
