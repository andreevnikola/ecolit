import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Redirect, Tabs } from 'expo-router';
import { useTheme } from 'tamagui';
import useUser from '~/hooks/useUser';

export const StylyzedTabs = ({ children }: { children: React.ReactNode }) => {
  const theme = useTheme();

  return (
    <Tabs
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.backgroundShade.get(),
        },
        headerTintColor: theme.primary.get(),
        headerTitleStyle: {
          fontWeight: 'bold',
          color: theme.text.get(),
        },
        tabBarStyle: {
          backgroundColor: theme.backgroundShade.get(),
          borderBlockColor: theme.backgroundTint.get(),
        },
        tabBarActiveTintColor: theme.accent.get(),
      }}>
      {children}
    </Tabs>
  );
};

export default function AppLayout() {
  const { isLoading, user } = useUser();

  if (!isLoading && !user) return <Redirect href={'/auth/getting-started'} />;

  return (
    <StylyzedTabs>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
        }}
      />
    </StylyzedTabs>
  );
}
