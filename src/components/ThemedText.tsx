import { FC } from 'react'
import { Text, TextProps } from 'react-native'
import { StyleSheet } from 'react-native-unistyles'

type Props = TextProps & {
  variant?: 'regular' | 'accent' | 'muted'
  size?: 'caption' | 'body' | 'heading'
  weight?: 'regular' | 'medium' | 'semibold' | 'bold'
  family?: 'sans' | 'serif' | 'rounded' | 'mono'
}

export const ThemedText: FC<Props> = ({
  variant = 'regular',
  size = 'body',
  weight = 'regular',
  family = 'sans',
  style,
  children,
  ...rest
}) => {
  styles.useVariants({ variant, size, weight, family })

  return (
    <Text style={[styles.text, style]} {...rest}>
      {children}
    </Text>
  )
}

const styles = StyleSheet.create(theme => ({
  text: {
    variants: {
      size: {
        caption: {
          fontSize: theme.fontSizes[3],
          lineHeight: theme.lineHeights[3],
        },
        body: {
          fontSize: theme.fontSizes[5],
          lineHeight: theme.lineHeights[5],
        },
        heading: {
          fontSize: theme.fontSizes[8],
          lineHeight: theme.lineHeights[8],
        },
      },
      variant: {
        regular: {
          color: theme.colors.foreground.text,
        },
        accent: {
          color: theme.colors.foreground.brand,
        },
        muted: {
          color: theme.colors.foreground.textSecondary,
        },
      },
      weight: {
        regular: {
          fontWeight: theme.fontWeights.regular,
        },
        medium: {
          fontWeight: theme.fontWeights.medium,
        },
        semibold: {
          fontWeight: theme.fontWeights.semibold,
        },
        bold: {
          fontWeight: theme.fontWeights.bold,
        },
      },
      family: {
        sans: {
          fontFamily: theme.fonts.sans,
        },
        serif: {
          fontFamily: theme.fonts.serif,
        },
        rounded: {
          fontFamily: theme.fonts.rounded,
        },
        mono: {
          fontFamily: theme.fonts.mono,
        },
      },
    },
    compoundVariants: [
      {
        size: 'heading',
        styles: {
          fontWeight: theme.fontWeights.semibold,
        },
      },
    ],
  },
}))
