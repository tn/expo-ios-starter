import { FC } from 'react'
import { useForm } from 'react-hook-form'
import { Alert } from 'react-native'
import { StyleSheet } from 'react-native-unistyles'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import { ControlledInput } from '@/components/ControlledInput'
import { ThemedButton } from '@/components/ThemedButton'
import { ThemedScrollView } from '@/components/ThemedScrollView'
import { ThemedView } from '@/components/ThemedView'

type FormValues = {
  name: string
  email: string
  password: string
  address?: string
  phone?: string
  notes?: string
}

const validationSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  address: z.string().optional(),
  phone: z.string().optional(),
  notes: z.string().optional(),
})

export const FormScreen: FC = () => {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(validationSchema),
    defaultValues: {
      name: 'Name',
      email: 'user@example.com',
      password: '123456',
      address: '',
      phone: '',
      notes: '',
    },
  })

  const onSubmit = (data: FormValues) => {
    Alert.alert('Form Submitted', JSON.stringify(data, null, 2))
  }

  return (
    <ThemedScrollView
      contentInsetAdjustmentBehavior="always"
      withSafeArea={false}
      type="keyboardAware"
      bottomOffset={20}
    >
      <ThemedView style={styles.vStack}>
        <ControlledInput
          control={control}
          name="name"
          label="Name"
          textInputProps={{ placeholder: 'Your name', size: 'large' }}
        />
        <ControlledInput
          control={control}
          name="email"
          label="Email"
          textInputProps={{
            placeholder: 'Your email',
            keyboardType: 'email-address',
            size: 'large',
          }}
        />
        <ControlledInput
          control={control}
          name="password"
          label="Password"
          textInputProps={{
            placeholder: 'Your password',
            secureTextEntry: true,
            size: 'large',
          }}
        />
        <ControlledInput
          control={control}
          name="address"
          label="Address"
          textInputProps={{ placeholder: 'Your address', size: 'large' }}
        />
        <ControlledInput
          control={control}
          name="phone"
          label="Phone"
          textInputProps={{
            placeholder: 'Your phone number',
            keyboardType: 'phone-pad',
            size: 'large',
          }}
        />
        <ControlledInput
          control={control}
          name="notes"
          label="Notes"
          textInputProps={{
            placeholder: 'Additional notes',
            multiline: true,
            numberOfLines: 4,
            size: 'large',
          }}
        />
      </ThemedView>
      <ThemedButton
        label="Submit"
        onPress={handleSubmit(onSubmit)}
        disabled={isSubmitting}
        variant="brand"
        radius="full"
        size="large"
      />
    </ThemedScrollView>
  )
}

const styles = StyleSheet.create(theme => ({
  vStack: {
    gap: theme.spacing[6],
    marginBottom: theme.spacing[6],
  },
  hStack: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing[3],
  },
}))
