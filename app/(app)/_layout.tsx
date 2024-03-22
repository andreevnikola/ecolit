import React, { useEffect } from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Redirect, Tabs } from 'expo-router';
import { Avatar, XGroup, useTheme } from 'tamagui';
import useUser from '~/hooks/useUser';
import { IUser } from '~/types/user';
import UserProfileIcon from '~/components/userProfile/UserProfileIcon';
import EcoPointsDisplay from '~/components/userProfile/EcoPointsDisplay';
import { supabase } from '~/utils/supabase';
import { useUserStore } from '~/stores/userStore';

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
        headerTitleAlign: 'left',
        headerTitleStyle: {
          fontWeight: 900,
          fontSize: 23,
          color: theme.text.get(),
        },
        tabBarStyle: {
          backgroundColor: theme.backgroundShade.get(),
          borderBlockColor: theme.backgroundTint.get(),
        },
        tabBarActiveTintColor: theme.accent.get(),
        headerRight: ({ tintColor }) => (
          <XGroup gap={8} alignItems="center" justifyContent="center">
            <EcoPointsDisplay />
            <UserProfileIcon avatarUrl={avatarUrl} email={email} />
          </XGroup>
        ),
      }}>
      {children}
    </Tabs>
  );
};

export default function AppLayout() {
  const { isLoading, user, points } = useUser();

  const gainPoints = useUserStore((state) => state.gainPoints);

  useEffect(() => {
    if (isLoading || !user) return;

    const userChannel = supabase
      .channel('user_db_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'users',
          // filter: `user=eq.${user!.id}`,
        },
        (payload) => {
          if ((payload.new as any).id === user.id && points < (payload.new as any).points)
            gainPoints((payload.new as any).points - points);
        }
      )
      .subscribe();

    return () => {
      userChannel.unsubscribe();
    };
  }, [user]);

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
          tabBarLabel: 'Моите купони',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="ticket" color={color} />,
        }}
      />
      <Tabs.Screen
        name="buyCoupon"
        options={{
          title: 'EcoLit',
          tabBarLabel: 'Купи купон',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="shopping-basket" color={color} />,
        }}
      />
      <Tabs.Screen
        name="recycle"
        options={{
          title: 'EcoLit',
          tabBarLabel: 'Рециклирай',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="recycle" color={color} />,
        }}
      />
    </StylyzedTabs>
  );
}
