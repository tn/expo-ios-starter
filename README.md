## Expo iOS Starter

A personal iOS-first Expo boilerplate for quick starts with a typed form flow, theming, and native-ready UI primitives.

### Included
- Expo Router.
- Unistyles.
- Basic theming.
- BootSplash.
- Pre-configured ESLint and Prettier.
- Expo Symbols (Beta).
- React Hook Form.
- Keyboard Controller.

### Requirements
- macOS with Xcode installed.
- Bun.
- CocoaPods (Xcode installs this by default; otherwise `sudo gem install cocoapods`).

### Install
```bash
bun install
```

`simple-git-hooks` installs automatically via `prepare` on dependency install.
If hooks were not set up (for example after cloning or reinstall), run:

```bash
bun run prepare
```

### Run (iOS)
```bash
bun run ios
```

### Other Scripts
- `bun run start` - start Expo dev server.
- `bun run lint` - run Expo ESLint.
- `bun run android` - Android run (if you add Android support).

### Project Structure
- App entry: [index.ts](index.ts)
- Router screens: [src/app](src/app)
- UI components: [src/components](src/components)
- Screens (non-router): [src/screens](src/screens)
- Theming: [src/theming](src/theming)
- Theme provider: [src/providers/ThemeProvider.tsx](src/providers/ThemeProvider.tsx)

### Usage Notes
- Add new routes under [src/app](src/app). The file name becomes the route.
- Reusable UI lives in [src/components](src/components).
- Form example is in [src/screens/form.tsx](src/screens/form.tsx) using React Hook Form.
- Theme tokens are in [src/theming](src/theming). Update tokens and variants there.

### Theming
The project has a 3-layer theming model:
- Palette (`src/theming/palette.ts`) - raw Radix scales and derived aliases (`solid`, `border`, `text`).
- Foundation (`src/theming/foundation.ts`) - spacing/sizing/radii/typography and other non-color tokens.
- Semantic theme (`src/theming/themes.ts`) - UI roles and states (`background`, `foreground`, `border`).

How to use it in components:
- Create styles via `StyleSheet.create(theme => ({ ... }))`.
- Prefer semantic colors (for example `theme.colors.background.neutral.default`) instead of direct palette steps.
- Use state tokens (`idle/focused/pressed/disabled`) in variants and map UI behavior to them.
- Keep public component APIs semantic (`tone`, `size`, `radius`) instead of raw color names.

Example: creating a new base component `ThemedBadge` (not present in the codebase yet):

```tsx
import { FC } from 'react'
import { ViewProps } from 'react-native'
import { StyleSheet } from 'react-native-unistyles'

import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'

type Props = ViewProps & {
  label: string
  tone?: 'neutral' | 'accent' | 'accentSubtle'
}

export const ThemedBadge: FC<Props> = ({ label, tone = 'neutral', style, ...rest }) => {
  styles.useVariants({ tone })

  return (
    <ThemedView style={[styles.badge, style]} radius="full" {...rest}>
      <ThemedText style={styles.label} size="footnote" weight="semibold">
        {label}
      </ThemedText>
    </ThemedView>
  )
}

const styles = StyleSheet.create(theme => ({
  badge: {
    alignSelf: 'flex-start',
    minHeight: theme.sizing.size24,
    justifyContent: 'center',
    paddingHorizontal: theme.spacing.space12,
    variants: {
      tone: {
        neutral: {
          backgroundColor: theme.colors.background.neutral.default,
        },
        accent: {
          backgroundColor: theme.colors.background.accentSolid.default,
        },
        accentSubtle: {
          backgroundColor: theme.colors.background.accentSubtle.default,
        },
      },
    },
  },
  label: {
    variants: {
      tone: {
        neutral: {
          color: theme.colors.foreground.neutral.secondary,
        },
        accent: {
          color: theme.colors.foreground.onAccent,
        },
        accentSubtle: {
          color: theme.colors.foreground.accent.default,
        },
      },
    },
  },
}))
```

Usage:

```tsx
<ThemedBadge label="New" tone="accent" />
```

### iOS Notes
- This template is configured for iOS only in [app.json](app.json).
- New Architecture is enabled (`newArchEnabled: true`).
