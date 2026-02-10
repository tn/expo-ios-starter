import { FC } from 'react'
import { withUnistyles } from 'react-native-unistyles'
import { SymbolView, SymbolViewProps } from 'expo-symbols'

type Props = SymbolViewProps & {
  tone?:
    | 'primary'
    | 'secondary'
    | 'tertiary'
    | 'accent'
    | 'accentStrong'
    | 'onAccent'
    | 'disabled'
}

const StyledSymbolView = withUnistyles(SymbolView)

export const Icon: FC<Props> = ({ tone = 'primary', ...props }) => {
  return (
    <StyledSymbolView
      {...props}
      uniProps={theme => ({
        tintColor:
          tone === 'primary'
            ? theme.colors.foreground.neutral.primary
            : tone === 'secondary'
              ? theme.colors.foreground.neutral.secondary
              : tone === 'tertiary'
                ? theme.colors.foreground.neutral.tertiary
                : tone === 'accent'
                  ? theme.colors.foreground.accent.default
                  : tone === 'accentStrong'
                    ? theme.colors.foreground.accent.strong
                    : tone === 'onAccent'
                      ? theme.colors.foreground.onAccent
                      : theme.colors.foreground.neutral.disabled,
      })}
    />
  )
}
