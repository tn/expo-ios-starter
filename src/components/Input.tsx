import { forwardRef } from 'react'
import { TextInput, TextInputProps } from 'react-native'
import { StyleSheet } from 'react-native-unistyles'

type Props = TextInputProps & {
  size?: 'small' | 'medium' | 'large'
}

export { Props as InputProps }

export const Input = forwardRef<TextInput, Props>(
  ({ style, size = 'medium', ...props }, ref) => {
    styles.useVariants({ size })

    return <TextInput {...props} ref={ref} style={[styles.input, style]} />
  },
)

Input.displayName = 'Input'

const styles = StyleSheet.create(theme => ({
  input: {
    fontSize: theme.fontSizes[4],
    color: theme.colors.foreground.text,
    backgroundColor: theme.colors.background.surface,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: theme.radii[3],
    borderColor: theme.colors.background.surfaceSecondary,
    borderCurve: 'continuous',
    paddingHorizontal: theme.spacing[3],

    variants: {
      size: {
        small: {
          height: theme.sizing[7],
          fontSize: theme.fontSizes[3],
        },
        medium: {
          height: theme.sizing[8],
          fontSize: theme.fontSizes[4],
        },
        large: {
          height: theme.sizing[10],
          fontSize: theme.fontSizes[7],
        },
      },
    },
  },
}))
