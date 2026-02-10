import { FC } from 'react'
import { View, ViewProps } from 'react-native'
import { StyleSheet } from 'react-native-unistyles'

type Props = ViewProps & {
  variant?: 'regular' | 'surface' | 'surfaceSecondary' | 'brand' | 'brandSubtle'
  radius?: 'none' | 'small' | 'medium' | 'large' | 'full'
  curve?: 'circular' | 'continuous'
}

export { Props as ThemedViewProps }

export const ThemedView: FC<Props> = ({
  variant = 'regular',
  radius = 'none',
  curve = 'continuous',
  style,
  children,
  ...rest
}) => {
  styles.useVariants({ variant, radius, curve })

  return (
    <View style={[styles.view, style]} {...rest}>
      {children}
    </View>
  )
}

const styles = StyleSheet.create(theme => ({
  view: {
    variants: {
      variant: {
        regular: {
          backgroundColor: theme.colors.background.page,
        },
        surface: {
          backgroundColor: theme.colors.background.surface,
        },
        surfaceSecondary: {
          backgroundColor: theme.colors.background.surfaceSecondary,
        },
        brand: {
          backgroundColor: theme.colors.background.brand,
        },
        brandSubtle: {
          backgroundColor: theme.colors.background.brandSubtle,
        },
      },
      radius: {
        none: {
          borderRadius: 0,
        },
        small: {
          borderRadius: theme.radii[1],
        },
        medium: {
          borderRadius: theme.radii[3],
        },
        large: {
          borderRadius: theme.radii[5],
        },
        full: {
          borderRadius: theme.radii[12],
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
