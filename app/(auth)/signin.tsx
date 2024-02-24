import { Feather } from '@expo/vector-icons';
import { Stack, useRouter, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Button, Text, YStack, useTheme } from 'tamagui';

import { Container, Main, Subtitle, Title } from '../../tamagui.config';
import { BackButton } from '~/components/BackButton';

export default function Details() {
  const { name } = useLocalSearchParams();

  const theme = useTheme();

  return (
    <Container>
      <Stack.Screen options={{ title: 'Впиши се', headerLeft: () => <BackButton /> }} />
      <Main>
        <YStack>
          <Title>Details</Title>
          <Subtitle>Showing details for user {name}.</Subtitle>
        </YStack>
      </Main>
    </Container>
  );
}
