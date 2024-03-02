import { useFonts } from 'expo-font';
import { SplashScreen, Stack } from 'expo-router';
import { useEffect } from 'react';
import { TamaguiProvider, Theme, View, useTheme } from 'tamagui';

import config from '../tamagui.config';
import { useColorScheme } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export const StylizedStack = ({ children }: { children?: React.ReactNode }) => {
  const theme = useTheme();

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.backgroundShade.get(),
        },
        headerTintColor: theme.primary.get(),
        headerTitleStyle: {
          fontWeight: 'bold',
          color: theme.text.get(),
        },
        headerBackTitleVisible: false,
      }}>
      {children}
    </Stack>
  );
};

export default function Layout() {
  const [loaded] = useFonts({
    Inter: require('@tamagui/font-inter/otf/Inter-Medium.otf'),
    InterBold: require('@tamagui/font-inter/otf/Inter-Bold.otf'),
  });

  const colorScheme = useColorScheme();

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) return null;

  return (
    <TamaguiProvider config={config}>
      <Theme name={colorScheme === 'dark' ? 'darkEcoLit' : 'lightEcoLit'}>
        <StylizedStack>
          <Stack.Screen name="(app)" options={{ headerShown: false }} />
          <Stack.Screen name="auth" options={{ headerShown: false }} />
        </StylizedStack>
      </Theme>
    </TamaguiProvider>
  );
}
