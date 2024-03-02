import { Stack, Link } from 'expo-router';
import { Main, YStack, ButtonText } from 'tamagui';
import { Container, Title, Subtitle, StyledButton } from '~/tamagui.config';

export default function GettingStarted() {
  return (
    <Container>
      <Main flex={1}>
        <Stack.Screen options={{ title: 'Добре дошъл' }} />
        <YStack>
          <Title fontWeight={'$16'}>EcoLit</Title>
          <Subtitle>Добре дошъл в нашата апликация.</Subtitle>
        </YStack>
      </Main>
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
    </Container>
  );
}
