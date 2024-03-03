import { useFonts } from 'expo-font';
import { SplashScreen, Stack } from 'expo-router';
import { useEffect } from 'react';
import { TamaguiProvider, Theme, View, useTheme } from 'tamagui';

import config from '../tamagui.config';
import { useColorScheme } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import onOpenScripts from '~/utils/onOpenScripts';
import { useUserStore } from '~/stores/userStore';
import onExitScripts from '~/utils/onExitScripts';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomSheetLib from '~/components/BottomSheet';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

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

const queryClient = new QueryClient();

export default function Layout() {
  const [loaded] = useFonts({
    Inter: require('@tamagui/font-inter/otf/Inter-Medium.otf'),
    InterBold: require('@tamagui/font-inter/otf/Inter-Bold.otf'),
  });

  const colorScheme = useColorScheme();

  const structurerAndSetterForUser = useUserStore((state) => state.structureAndSetUser);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  useEffect(() => {
    const subscriptions = onOpenScripts({ structurerAndSetter: structurerAndSetterForUser });

    return () => onExitScripts(subscriptions);
  }, []);

  if (!loaded) return null;

  return (
    <TamaguiProvider config={config}>
      <Theme name={colorScheme === 'dark' ? 'darkEcoLit' : 'lightEcoLit'}>
        <QueryClientProvider client={queryClient}>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <StylizedStack>
              <Stack.Screen name="(app)" options={{ headerShown: false }} />
              <Stack.Screen name="auth" options={{ headerShown: false }} />
            </StylizedStack>
            <BottomSheetLib />
          </GestureHandlerRootView>
        </QueryClientProvider>
      </Theme>
    </TamaguiProvider>
  );
}
