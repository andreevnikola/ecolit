import { Stack, Link } from 'expo-router';
import { YStack } from 'tamagui';

import { Container, Main, Title, Subtitle, StyledButton, ButtonText } from '../tamagui.config';

export default function Page() {
  return (
    <Container>
      <Main>
        <Stack.Screen options={{ title: 'Добре дошъл' }} />
        <YStack>
          <Title fontWeight={'$16'}>EcoLit</Title>
          <Subtitle>Добре дошъл в нашата апликация.</Subtitle>
        </YStack>
        <Link href={{ pathname: '/auth/signin' }} asChild>
          <StyledButton colors="accent">
            <ButtonText>Впиши се</ButtonText>
          </StyledButton>
        </Link>
      </Main>
    </Container>
  );
}
