import { FC } from 'react'
import { View, ViewProps } from 'react-native'
import { StyleSheet } from 'react-native-unistyles'

type Props = ViewProps & {
  tone?: 'page' | 'subtle' | 'surface' | 'accentSubtle' | 'accent'
  radius?: 'none' | 'small' | 'medium' | 'large' | 'full'
  curve?: 'circular' | 'continuous'
}

export { Props as ThemedViewProps }

export const ThemedView: FC<Props> = ({
  tone = 'page',
  radius = 'none',
  curve = 'continuous',
  style,
  children,
  ...rest
}) => {
  styles.useVariants({ tone, radius, curve })

  return (
    <View style={[styles.view, style]} {...rest}>
      {children}
    </View>
  )
}

const styles = StyleSheet.create(theme => ({
  view: {
    variants: {
      tone: {
        page: {
          backgroundColor: theme.colors.background.page,
        },
        subtle: {
          backgroundColor: theme.colors.background.subtle,
        },
        surface: {
          backgroundColor: theme.colors.background.neutral.default,
        },
        accentSubtle: {
          backgroundColor: theme.colors.background.accentSubtle.default,
        },
        accent: {
          backgroundColor: theme.colors.background.accentSolid.default,
        },
      },
      radius: {
        none: {
          borderRadius: theme.radii.corner0,
        },
        small: {
          borderRadius: theme.radii.corner4,
        },
        medium: {
          borderRadius: theme.radii.corner12,
        },
        large: {
          borderRadius: theme.radii.corner20,
        },
        full: {
          borderRadius: theme.radii.full,
        },
      },
      curve: {
        circular: {
          borderCurve: 'circular',
        },
        continuous: {
          borderCurve: 'continuous',
        },
      },
    },
  },
}))
