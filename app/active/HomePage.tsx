import { Stack } from 'expo-router';
import { YStack } from 'tamagui';
import { Container, Main, Title, Subtitle } from '~/tamagui.config';

export default function HomePage() {
  const user = useUser();
  console.log(user);
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
