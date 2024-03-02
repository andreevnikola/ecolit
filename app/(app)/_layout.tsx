import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Redirect, Tabs } from 'expo-router';
import { Avatar, useTheme } from 'tamagui';
import useUser from '~/hooks/useUser';
import { IUser } from '~/types/user';
import UserProfileIcon from '~/components/userProfile/UserProfileIcon';

export const StylyzedTabs = ({
  children,
  avatarUrl,
}: {
  children: React.ReactNode;
  avatarUrl: string;
}) => {
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
        headerRight: ({ tintColor }) => <UserProfileIcon avatarUrl={avatarUrl} />,
      }}>
      {children}
    </Tabs>
  );
};

export default function AppLayout() {
  const { isLoading, user } = useUser();

  if (!isLoading && !user) return <Redirect href={'/auth/getting-started'} />;

  return (
    <StylyzedTabs avatarUrl={user ? user.avatarUrl : 'fsdajkfjls'}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'EcoLit',
          // headerTitle: 'Карта',
          tabBarLabel: 'Карта',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="map" color={color} />,
        }}
      />
    </StylyzedTabs>
  );
}
