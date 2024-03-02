import { Stack, Link } from 'expo-router';
import { YStack } from 'tamagui';

import { Container, Main, Title, Subtitle, StyledButton, ButtonText } from '../tamagui.config';
import { supabase } from '~/utils/supabase';
import onOpenScripts from '~/utils/onOpenScripts';
import { useEffect } from 'react';
import onExitScripts from '~/utils/onExitScripts';

import { create } from 'zustand';
import loadPersistedUser from '~/utils/auth/loadPersistedUser';
import useUser from '~/hooks/useUser';
import { useUserStore } from '~/stores/userStore';

export default function Page() {
  const structurerAndSetterForUser = useUserStore((state) => state.structureAndSetUser);

  const user = useUser();
  console.log(user);

  useEffect(() => {
    const subscriptions = onOpenScripts({
      structurerAndSetter: structurerAndSetterForUser,
    });

    return () => onExitScripts(subscriptions);
  }, []);

  return (
    <Container>
      <Main>
        <Stack.Screen options={{ title: 'Добре дошъл' }} />
        <YStack>
          <Title fontWeight={'$16'}>EcoLit</Title>
          <Subtitle>Добре дошъл в нашата апликация.</Subtitle>
        </YStack>
        <YStack gap={8}>
          <Link href={{ pathname: '/auth/signin' }} asChild>
            <StyledButton colors="primary">
              <ButtonText>Впиши се</ButtonText>
            </StyledButton>
          </Link>
          <Link href={{ pathname: '/auth/register' }} asChild>
            <StyledButton colors="accent">
              <ButtonText>Регистрирай се</ButtonText>
            </StyledButton>
          </Link>
        </YStack>
      </Main>
    </Container>
  );
}
