import { forwardRef, useState } from 'react'
import { TextInput, TextInputProps } from 'react-native'
import { StyleSheet } from 'react-native-unistyles'

import { useTheme } from '@/hooks/useTheme'

type Props = TextInputProps & {
  size?: 'small' | 'medium' | 'large'
}

export { Props as InputProps }

export const Input = forwardRef<TextInput, Props>(
  (
    {
      style,
      size = 'medium',
      editable = true,
      onFocus,
      onBlur,
      placeholderTextColor,
      ...props
    },
    ref,
  ) => {
    const theme = useTheme()
    const [focused, setFocused] = useState(false)
    const state = !editable ? 'disabled' : focused ? 'focused' : 'idle'

    styles.useVariants({ size, state })

    return (
      <TextInput
        {...props}
        ref={ref}
        editable={editable}
        onFocus={event => {
          setFocused(true)
          onFocus?.(event)
        }}
        onBlur={event => {
          setFocused(false)
          onBlur?.(event)
        }}
        placeholderTextColor={
          placeholderTextColor ??
          (editable
            ? theme.colors.foreground.neutral.tertiary
            : theme.colors.foreground.neutral.disabled)
        }
        style={[styles.input, style]}
      />
    )
  },
)

Input.displayName = 'Input'

const styles = StyleSheet.create(theme => ({
  input: {
    fontSize: theme.fontSizes.subheadline,
    color: theme.colors.foreground.neutral.primary,
    backgroundColor: theme.colors.background.neutral.default,
    borderWidth: theme.borderWidths.hairline,
    borderRadius: theme.radii.corner12,
    borderColor: theme.colors.border.neutral.default,
    borderCurve: 'continuous',
    paddingHorizontal: theme.spacing.space12,

    variants: {
      size: {
        small: {
          height: theme.sizing.size32,
          fontSize: theme.fontSizes.footnote,
        },
        medium: {
          height: theme.sizing.size40,
          fontSize: theme.fontSizes.subheadline,
        },
        large: {
          height: theme.sizing.size48,
          fontSize: theme.fontSizes.headline,
        },
      },
      state: {
        idle: {
          backgroundColor: theme.colors.background.neutral.default,
          borderColor: theme.colors.border.neutral.default,
          color: theme.colors.foreground.neutral.primary,
        },
        focused: {
          backgroundColor: theme.colors.background.neutral.hover,
          borderColor: theme.colors.border.accent.focus,
          color: theme.colors.foreground.neutral.primary,
        },
        disabled: {
          backgroundColor: theme.colors.background.neutral.disabled,
          borderColor: theme.colors.border.neutral.disabled,
          color: theme.colors.foreground.neutral.disabled,
        },
      },
    },
  },
}))
