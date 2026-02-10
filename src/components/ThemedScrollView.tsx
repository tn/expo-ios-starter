import { FC, useEffect, useRef } from 'react'
import { ScrollView, ScrollViewProps } from 'react-native'
import {
  KeyboardAwareScrollView,
  KeyboardAwareScrollViewProps,
  KeyboardAwareScrollViewRef,
} from 'react-native-keyboard-controller'
import { StyleSheet, withUnistyles } from 'react-native-unistyles'

const StyledScrollView = withUnistyles(ScrollView)
const StyledKeyboardAwareScrollView = withUnistyles(KeyboardAwareScrollView)

type BaseProps = {
  withSafeArea?: boolean
}

type DefaultProps = BaseProps &
  ScrollViewProps & {
    type?: 'default'
  }

type KeyboardAwareProps = BaseProps &
  ScrollViewProps &
  KeyboardAwareScrollViewProps & {
    type: 'keyboardAware'
  }

type Props = DefaultProps | KeyboardAwareProps

export const ThemedScrollView: FC<Props> = ({
  style,
  children,
  withSafeArea = true,
  type = 'default',
  contentContainerStyle,
  ...rest
}) => {
  const ref = useRef<KeyboardAwareScrollViewRef>(null)

  styles.useVariants({ withSafeArea })

  useEffect(() => {
    if (type === 'keyboardAware' && ref.current) {
      ref.current.assureFocusedInputVisible()
    }
  }, [type])

  return type === 'keyboardAware' ? (
    <StyledKeyboardAwareScrollView
      style={style}
      contentContainerStyle={[styles.scrollView, contentContainerStyle]}
      {...rest}
    >
      {children}
    </StyledKeyboardAwareScrollView>
  ) : (
    <StyledScrollView
      style={style}
      contentContainerStyle={[styles.scrollView, contentContainerStyle]}
      {...rest}
    >
      {children}
    </StyledScrollView>
  )
}

const styles = StyleSheet.create((theme, rt) => ({
  scrollView: {
    flexGrow: 1,
    paddingHorizontal: theme.spacing.space20,
    backgroundColor: theme.colors.background.page,
    variants: {
      withSafeArea: {
        true: {
          paddingTop: rt.insets.top,
          paddingBottom: rt.insets.bottom,
        },
      },
    },
  },
}))
