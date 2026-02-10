import { ComponentProps, FC, ReactNode, useEffect, useState } from 'react'
import {
  Pressable,
  PressableProps,
  StyleSheet as RNStyleSheet,
  View,
} from 'react-native'
import Animated, {
  cancelAnimation,
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated'
import { StyleSheet } from 'react-native-unistyles'

import { Icon } from '@/components/Icon'
import { ThemedText } from '@/components/ThemedText'
import { useTheme } from '@/hooks/useTheme'

type Tone = 'neutral' | 'accent' | 'accentSubtle'
type Size = 'small' | 'medium' | 'large'
type Radius = 'none' | 'small' | 'medium' | 'large' | 'full'
type IconTone = ComponentProps<typeof Icon>['tone']

type ButtonIconConfig = Pick<
  ComponentProps<typeof Icon>,
  'name' | 'tone' | 'size' | 'weight' | 'scale' | 'type' | 'fallback'
>

type Props = Omit<PressableProps, 'children'> & {
  children?: ReactNode
  label?: string
  size?: Size
  tone?: Tone
  radius?: Radius
  leftIcon?: ButtonIconConfig
  rightIcon?: ButtonIconConfig
  gap?: number
  loading?: boolean
  loadingIcon?: ButtonIconConfig
}

const labelSizeByButtonSize: Record<Size, 'footnote' | 'callout' | 'headline'> =
  {
    small: 'footnote',
    medium: 'callout',
    large: 'headline',
  }

const iconSizeByButtonSize: Record<Size, number> = {
  small: 14,
  medium: 16,
  large: 18,
}

const getDefaultIconTone = (
  tone: Tone,
  interaction: 'idle' | 'pressed' | 'disabled',
): IconTone => {
  if (interaction === 'disabled') {
    return 'disabled'
  }

  if (tone === 'accent') {
    return 'onAccent'
  }

  if (tone === 'accentSubtle') {
    return 'accent'
  }

  return 'primary'
}

export const ThemedButton: FC<Props> = ({
  size = 'medium',
  tone = 'neutral',
  radius = 'medium',
  label,
  children,
  leftIcon,
  rightIcon,
  gap,
  loading = false,
  loadingIcon,
  disabled = false,
  onPressIn,
  onPressOut,
  style,
  accessibilityState,
  ...props
}) => {
  const theme = useTheme()
  const [pressed, setPressed] = useState(false)
  const rotation = useSharedValue(0)

  const effectiveDisabled = disabled || loading
  const interaction = effectiveDisabled
    ? 'disabled'
    : pressed
      ? 'pressed'
      : 'idle'
  const resolvedGap =
    gap ?? (size === 'large' ? theme.spacing.space12 : theme.spacing.space8)
  const defaultIconSize = iconSizeByButtonSize[size]
  const defaultIconTone = getDefaultIconTone(tone, interaction)
  const resolvedLoadingIcon = loadingIcon ?? { name: 'progress.indicator' }

  styles.useVariants({ size, tone, radius, interaction })

  useEffect(() => {
    if (loading) {
      rotation.value = withRepeat(
        withTiming(360, {
          duration: 900,
          easing: Easing.linear,
        }),
        -1,
        false,
      )
    } else {
      cancelAnimation(rotation)
      rotation.value = 0
    }

    return () => {
      cancelAnimation(rotation)
    }
  }, [loading, rotation])

  const loaderAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }))

  const content =
    children ??
    (label ? (
      <ThemedText
        style={styles.label}
        size={labelSizeByButtonSize[size]}
        weight="semibold"
      >
        {label}
      </ThemedText>
    ) : null)

  return (
    <Pressable
      {...props}
      accessibilityState={{
        ...accessibilityState,
        disabled: effectiveDisabled,
        busy: !!loading,
      }}
      disabled={effectiveDisabled}
      onPressIn={event => {
        setPressed(true)
        onPressIn?.(event)
      }}
      onPressOut={event => {
        setPressed(false)
        onPressOut?.(event)
      }}
      style={style}
    >
      <View style={styles.button}>
        <View
          style={[
            styles.contentRow,
            { gap: resolvedGap },
            loading && styles.hidden,
          ]}
          accessibilityElementsHidden={loading}
          importantForAccessibility={loading ? 'no-hide-descendants' : 'auto'}
        >
          {leftIcon && (
            <Icon
              name={leftIcon.name}
              tone={leftIcon.tone ?? defaultIconTone}
              size={leftIcon.size ?? defaultIconSize}
              weight={leftIcon.weight}
              scale={leftIcon.scale}
              type={leftIcon.type}
              fallback={leftIcon.fallback}
            />
          )}
          {content}
          {rightIcon && (
            <Icon
              name={rightIcon.name}
              tone={rightIcon.tone ?? defaultIconTone}
              size={rightIcon.size ?? defaultIconSize}
              weight={rightIcon.weight}
              scale={rightIcon.scale}
              type={rightIcon.type}
              fallback={rightIcon.fallback}
            />
          )}
        </View>
        {loading && (
          <View style={styles.loaderOverlay} pointerEvents="none">
            <Animated.View style={loaderAnimatedStyle}>
              <Icon
                name={resolvedLoadingIcon.name}
                tone={resolvedLoadingIcon.tone ?? defaultIconTone}
                size={resolvedLoadingIcon.size ?? defaultIconSize}
                weight={resolvedLoadingIcon.weight}
                scale={resolvedLoadingIcon.scale}
                type={resolvedLoadingIcon.type}
                fallback={resolvedLoadingIcon.fallback}
              />
            </Animated.View>
          </View>
        )}
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create(theme => ({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    variants: {
      size: {
        small: {
          height: theme.sizing.size32,
          paddingHorizontal: theme.spacing.space12,
        },
        medium: {
          height: theme.sizing.size44,
          paddingHorizontal: theme.spacing.space16,
        },
        large: {
          height: theme.sizing.size48,
          paddingHorizontal: theme.spacing.space20,
        },
      },
      radius: {
        none: {
          borderRadius: theme.radii.corner0,
        },
        small: {
          borderRadius: theme.radii.corner8,
        },
        medium: {
          borderRadius: theme.radii.corner12,
        },
        large: {
          borderRadius: theme.radii.corner16,
        },
        full: {
          borderRadius: theme.radii.full,
        },
      },
      interaction: {
        idle: {},
        pressed: {},
        disabled: {
          opacity: theme.opacities.disabled,
        },
      },
      tone: {
        neutral: {},
        accent: {},
        accentSubtle: {},
      },
    },
    compoundVariants: [
      {
        tone: 'neutral',
        interaction: 'idle',
        styles: {
          backgroundColor: theme.colors.background.neutral.default,
        },
      },
      {
        tone: 'neutral',
        interaction: 'pressed',
        styles: {
          backgroundColor: theme.colors.background.neutral.active,
        },
      },
      {
        tone: 'neutral',
        interaction: 'disabled',
        styles: {
          backgroundColor: theme.colors.background.neutral.disabled,
        },
      },
      {
        tone: 'accent',
        interaction: 'idle',
        styles: {
          backgroundColor: theme.colors.background.accentSolid.default,
        },
      },
      {
        tone: 'accent',
        interaction: 'pressed',
        styles: {
          backgroundColor: theme.colors.background.accentSolid.active,
        },
      },
      {
        tone: 'accent',
        interaction: 'disabled',
        styles: {
          backgroundColor: theme.colors.background.accentSolid.disabled,
        },
      },
      {
        tone: 'accentSubtle',
        interaction: 'idle',
        styles: {
          backgroundColor: theme.colors.background.accentSubtle.default,
        },
      },
      {
        tone: 'accentSubtle',
        interaction: 'pressed',
        styles: {
          backgroundColor: theme.colors.background.accentSubtle.active,
        },
      },
      {
        tone: 'accentSubtle',
        interaction: 'disabled',
        styles: {
          backgroundColor: theme.colors.background.accentSubtle.disabled,
        },
      },
    ],
  },
  contentRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  hidden: {
    opacity: 0,
  },
  loaderOverlay: {
    ...RNStyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    variants: {
      tone: {
        neutral: {
          color: theme.colors.foreground.neutral.primary,
        },
        accent: {
          color: theme.colors.foreground.onAccent,
        },
        accentSubtle: {
          color: theme.colors.foreground.accent.default,
        },
      },
      interaction: {
        idle: {},
        pressed: {},
        disabled: {
          color: theme.colors.foreground.neutral.disabled,
        },
      },
    },
    compoundVariants: [
      {
        tone: 'accentSubtle',
        interaction: 'pressed',
        styles: {
          color: theme.colors.foreground.accent.strong,
        },
      },
    ],
  },
}))

export type { ButtonIconConfig }
