import { FC } from 'react'
import { Text, TextProps } from 'react-native'
import { StyleSheet } from 'react-native-unistyles'

type Props = TextProps & {
  tone?:
    | 'primary'
    | 'secondary'
    | 'tertiary'
    | 'accent'
    | 'onAccent'
    | 'disabled'
  size?:
    | 'caption2'
    | 'caption1'
    | 'footnote'
    | 'subheadline'
    | 'callout'
    | 'body'
    | 'headline'
    | 'title3'
    | 'title2'
    | 'title1'
    | 'largeTitle'
  weight?: 'regular' | 'medium' | 'semibold' | 'bold'
  family?: 'sans' | 'serif' | 'rounded' | 'mono'
}

export const ThemedText: FC<Props> = ({
  tone = 'primary',
  size = 'body',
  weight = 'regular',
  family = 'sans',
  style,
  children,
  ...rest
}) => {
  styles.useVariants({ tone, size, weight, family })

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
        caption2: {
          fontSize: theme.fontSizes.caption2,
          lineHeight: theme.lineHeights.caption2,
        },
        caption1: {
          fontSize: theme.fontSizes.caption1,
          lineHeight: theme.lineHeights.caption1,
        },
        footnote: {
          fontSize: theme.fontSizes.footnote,
          lineHeight: theme.lineHeights.footnote,
        },
        subheadline: {
          fontSize: theme.fontSizes.subheadline,
          lineHeight: theme.lineHeights.subheadline,
        },
        callout: {
          fontSize: theme.fontSizes.callout,
          lineHeight: theme.lineHeights.callout,
        },
        body: {
          fontSize: theme.fontSizes.body,
          lineHeight: theme.lineHeights.body,
        },
        headline: {
          fontSize: theme.fontSizes.headline,
          lineHeight: theme.lineHeights.headline,
        },
        title3: {
          fontSize: theme.fontSizes.title3,
          lineHeight: theme.lineHeights.title3,
        },
        title2: {
          fontSize: theme.fontSizes.title2,
          lineHeight: theme.lineHeights.title2,
        },
        title1: {
          fontSize: theme.fontSizes.title1,
          lineHeight: theme.lineHeights.title1,
        },
        largeTitle: {
          fontSize: theme.fontSizes.largeTitle,
          lineHeight: theme.lineHeights.largeTitle,
        },
      },
      tone: {
        primary: {
          color: theme.colors.foreground.neutral.primary,
        },
        secondary: {
          color: theme.colors.foreground.neutral.secondary,
        },
        tertiary: {
          color: theme.colors.foreground.neutral.tertiary,
        },
        accent: {
          color: theme.colors.foreground.accent.default,
        },
        onAccent: {
          color: theme.colors.foreground.onAccent,
        },
        disabled: {
          color: theme.colors.foreground.neutral.disabled,
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
        size: 'headline',
        styles: {
          fontWeight: theme.fontWeights.semibold,
        },
      },
      {
        size: 'title3',
        styles: {
          fontWeight: theme.fontWeights.semibold,
        },
      },
      {
        size: 'title2',
        styles: {
          fontWeight: theme.fontWeights.semibold,
        },
      },
      {
        size: 'title1',
        styles: {
          fontWeight: theme.fontWeights.semibold,
        },
      },
      {
        size: 'largeTitle',
        styles: {
          fontWeight: theme.fontWeights.semibold,
        },
      },
    ],
  },
}))
