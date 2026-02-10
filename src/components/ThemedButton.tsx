import { FC, ReactNode, useState } from 'react'
import { Pressable, PressableProps, View } from 'react-native'
import { StyleSheet } from 'react-native-unistyles'

import { ThemedText } from '@/components/ThemedText'

type Tone = 'neutral' | 'accent' | 'accentSubtle'
type Size = 'small' | 'medium' | 'large'
type Radius = 'none' | 'small' | 'medium' | 'large' | 'full'

type Props = Omit<PressableProps, 'children'> & {
  children?: ReactNode
  label?: string
  size?: Size
  tone?: Tone
  radius?: Radius
}

const labelSizeByButtonSize: Record<Size, 'footnote' | 'callout' | 'headline'> =
  {
    small: 'footnote',
    medium: 'callout',
    large: 'headline',
  }

export const ThemedButton: FC<Props> = ({
  size = 'medium',
  tone = 'neutral',
  radius = 'medium',
  label,
  children,
  disabled = false,
  onPressIn,
  onPressOut,
  style,
  ...props
}) => {
  const [pressed, setPressed] = useState(false)
  const interaction = disabled ? 'disabled' : pressed ? 'pressed' : 'idle'

  styles.useVariants({ size, tone, radius, interaction })

  return (
    <Pressable
      {...props}
      disabled={disabled}
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
        {children ??
          (label ? (
            <ThemedText
              style={styles.label}
              size={labelSizeByButtonSize[size]}
              weight="semibold"
            >
              {label}
            </ThemedText>
          ) : null)}
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create(theme => ({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
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
