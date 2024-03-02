import { Stack, Link } from 'expo-router';
import { YStack } from 'tamagui';

import { Container, Main, Title, Subtitle, StyledButton, ButtonText } from '~/tamagui.config';
import { supabase } from '~/utils/supabase';

export default function HomePage() {
  return (
    <Container>
      <Main>
        <Stack.Screen options={{ title: 'EcoLit', headerBackVisible: false }} />
        <YStack>
          <Title fontWeight={'$16'}>EcoLit</Title>
          <Subtitle>От тука можеш да ползваш наща апликация.</Subtitle>
        </YStack>
      </Main>
    </Container>
  );
}
