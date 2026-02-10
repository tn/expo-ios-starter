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

### iOS Notes
- This template is configured for iOS only in [app.json](app.json).
- New Architecture is enabled (`newArchEnabled: true`).
