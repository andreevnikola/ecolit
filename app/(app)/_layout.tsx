import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Redirect, Tabs } from 'expo-router';
import { Avatar, useTheme } from 'tamagui';
import useUser from '~/hooks/useUser';
import { IUser } from '~/types/user';
import UserProfileIcon from '~/components/userProfile/UserProfileIcon';

export const StylyzedTabs = ({
  children,
  full_name,
  avatarUrl,
  email,
}: {
  children: React.ReactNode;
  avatarUrl: string;
  full_name: string;
  email: string;
}) => {
  const theme = useTheme();

  return (
    <Tabs
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.backgroundShade.get(),
        },
        tabBarVisibilityAnimationConfig: {
          show: {
            animation: 'spring',
          },
          hide: {
            animation: 'spring',
          },
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
        headerRight: ({ tintColor }) => <UserProfileIcon avatarUrl={avatarUrl} email={email} />,
      }}>
      {children}
    </Tabs>
  );
};

export default function AppLayout() {
  const { isLoading, user } = useUser();

  if (!isLoading && !user) return <Redirect href={'/auth/getting-started'} />;

  return (
    <StylyzedTabs
      avatarUrl={user ? user.avatarUrl : 'fsdajkfjls'}
      email={user?.email || 'fdasfsdaf'}
      full_name={user?.fullName || 'fajsklfsjldk'}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'EcoLit',
          tabBarLabel: 'Карта',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="map" color={color} />,
        }}
      />
      <Tabs.Screen
        name="coupons"
        options={{
          title: 'EcoLit',
          tabBarLabel: 'Купони',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="ticket" color={color} />,
        }}
      />
    </StylyzedTabs>
  );
}
