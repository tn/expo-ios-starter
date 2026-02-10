import { FieldValues, useController, UseControllerProps } from 'react-hook-form'
import { StyleSheet } from 'react-native-unistyles'

import { Input, InputProps } from '@/components/Input'
import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'

type Props<TFieldValues extends FieldValues> =
  UseControllerProps<TFieldValues> & {
    label?: string
    textInputProps?: Omit<InputProps, 'onChangeText' | 'value' | 'editable'>
  }

export const ControlledInput = <TFieldValues extends FieldValues>({
  label,
  textInputProps,
  ...props
}: Props<TFieldValues>) => {
  const {
    field: { onBlur, onChange, value, disabled, ref },
    fieldState,
  } = useController<TFieldValues>(props)

  return (
    <ThemedView style={styles.vStack}>
      {label && (
        <ThemedText tone="secondary" size="callout" weight="medium">
          {label}
        </ThemedText>
      )}
      <Input
        onBlur={onBlur}
        onChangeText={onChange}
        value={value}
        ref={ref}
        editable={!disabled}
        {...textInputProps}
      />
      {fieldState.error && (
        <ThemedText tone="accent" size="footnote">
          {fieldState.error.message}
        </ThemedText>
      )}
    </ThemedView>
  )
}

const styles = StyleSheet.create(theme => ({
  vStack: {
    gap: theme.spacing.space8,
  },
}))
