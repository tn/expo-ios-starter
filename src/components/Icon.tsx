import { FC } from 'react'
import { withUnistyles } from 'react-native-unistyles'
import { SymbolView, SymbolViewProps } from 'expo-symbols'

type Props = SymbolViewProps & {
  variant?: 'surface' | 'brand' | 'brandSubtle'
}

const StyledSymbolView = withUnistyles(SymbolView)

export const Icon: FC<Props> = ({ variant = 'surface', ...props }) => {
  return (
    <StyledSymbolView
      {...props}
      uniProps={(theme, rt) => ({
        tintColor:
          variant === 'surface'
            ? theme.colors.foreground.text
            : variant === 'brand'
              ? theme.colors.foreground.brand
              : rt.colorScheme === 'light'
                ? theme.colors.foreground.brandSubtle
                : theme.colors.foreground.text,
      })}
    />
  )
}
